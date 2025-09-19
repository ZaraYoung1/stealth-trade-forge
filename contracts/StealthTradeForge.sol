// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract StealthTradeForge is SepoliaConfig {
    using FHE for *;
    
    struct Order {
        euint32 orderId;
        euint32 quantity;
        euint32 price;
        euint8 orderType; // 0: Buy, 1: Sell
        ebool isActive;
        address trader;
        uint256 timestamp;
        string symbol;
    }
    
    struct Position {
        euint32 positionId;
        euint32 quantity;
        euint32 entryPrice;
        euint32 currentPrice;
        euint8 positionType; // 0: Long, 1: Short
        ebool isOpen;
        address trader;
        uint256 timestamp;
        string symbol;
    }
    
    struct Trade {
        euint32 tradeId;
        euint32 quantity;
        euint32 price;
        euint32 profit;
        address buyer;
        address seller;
        uint256 timestamp;
        string symbol;
    }
    
    mapping(uint256 => Order) public orders;
    mapping(uint256 => Position) public positions;
    mapping(uint256 => Trade) public trades;
    mapping(address => euint32) public traderBalance;
    mapping(address => euint32) public traderReputation;
    mapping(string => euint32) public symbolPrice;
    
    uint256 public orderCounter;
    uint256 public positionCounter;
    uint256 public tradeCounter;
    
    address public owner;
    address public verifier;
    
    event OrderCreated(uint256 indexed orderId, address indexed trader, string symbol);
    event OrderMatched(uint256 indexed orderId, uint256 indexed tradeId, address indexed buyer, address seller);
    event PositionOpened(uint256 indexed positionId, address indexed trader, string symbol);
    event PositionClosed(uint256 indexed positionId, address indexed trader, uint32 profit);
    event TradeExecuted(uint256 indexed tradeId, address indexed buyer, address indexed seller, string symbol);
    event BalanceUpdated(address indexed trader, uint32 newBalance);
    event ReputationUpdated(address indexed trader, uint32 newReputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createOrder(
        string memory _symbol,
        externalEuint32 _quantity,
        externalEuint32 _price,
        externalEuint8 _orderType,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_symbol).length > 0, "Symbol cannot be empty");
        
        uint256 orderId = orderCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalQuantity = FHE.fromExternal(_quantity, inputProof);
        euint32 internalPrice = FHE.fromExternal(_price, inputProof);
        euint8 internalOrderType = FHE.fromExternal(_orderType, inputProof);
        
        orders[orderId] = Order({
            orderId: FHE.asEuint32(0), // Will be set properly later
            quantity: internalQuantity,
            price: internalPrice,
            orderType: internalOrderType,
            isActive: FHE.asEbool(true),
            trader: msg.sender,
            timestamp: block.timestamp,
            symbol: _symbol
        });
        
        emit OrderCreated(orderId, msg.sender, _symbol);
        return orderId;
    }
    
    function matchOrders(
        uint256 buyOrderId,
        uint256 sellOrderId,
        externalEuint32 _quantity,
        externalEuint32 _price,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(orders[buyOrderId].trader != address(0), "Buy order does not exist");
        require(orders[sellOrderId].trader != address(0), "Sell order does not exist");
        require(orders[buyOrderId].trader != orders[sellOrderId].trader, "Cannot match with self");
        
        uint256 tradeId = tradeCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalQuantity = FHE.fromExternal(_quantity, inputProof);
        euint32 internalPrice = FHE.fromExternal(_price, inputProof);
        
        trades[tradeId] = Trade({
            tradeId: FHE.asEuint32(0), // Will be set properly later
            quantity: internalQuantity,
            price: internalPrice,
            profit: FHE.asEuint32(0), // Will be calculated later
            buyer: orders[buyOrderId].trader,
            seller: orders[sellOrderId].trader,
            timestamp: block.timestamp,
            symbol: orders[buyOrderId].symbol
        });
        
        // Update order quantities
        orders[buyOrderId].quantity = FHE.sub(orders[buyOrderId].quantity, internalQuantity);
        orders[sellOrderId].quantity = FHE.sub(orders[sellOrderId].quantity, internalQuantity);
        
        // Check if orders are fully filled
        ebool buyOrderFilled = FHE.lt(orders[buyOrderId].quantity, FHE.asEuint32(1));
        ebool sellOrderFilled = FHE.lt(orders[sellOrderId].quantity, FHE.asEuint32(1));
        
        if (FHE.decrypt(buyOrderFilled)) {
            orders[buyOrderId].isActive = FHE.asEbool(false);
        }
        if (FHE.decrypt(sellOrderFilled)) {
            orders[sellOrderId].isActive = FHE.asEbool(false);
        }
        
        emit OrderMatched(buyOrderId, tradeId, orders[buyOrderId].trader, orders[sellOrderId].trader);
        emit TradeExecuted(tradeId, orders[buyOrderId].trader, orders[sellOrderId].trader, orders[buyOrderId].symbol);
        
        return tradeId;
    }
    
    function openPosition(
        string memory _symbol,
        externalEuint32 _quantity,
        externalEuint32 _entryPrice,
        externalEuint8 _positionType,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_symbol).length > 0, "Symbol cannot be empty");
        
        uint256 positionId = positionCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalQuantity = FHE.fromExternal(_quantity, inputProof);
        euint32 internalEntryPrice = FHE.fromExternal(_entryPrice, inputProof);
        euint8 internalPositionType = FHE.fromExternal(_positionType, inputProof);
        
        positions[positionId] = Position({
            positionId: FHE.asEuint32(0), // Will be set properly later
            quantity: internalQuantity,
            entryPrice: internalEntryPrice,
            currentPrice: internalEntryPrice,
            positionType: internalPositionType,
            isOpen: FHE.asEbool(true),
            trader: msg.sender,
            timestamp: block.timestamp,
            symbol: _symbol
        });
        
        emit PositionOpened(positionId, msg.sender, _symbol);
        return positionId;
    }
    
    function closePosition(
        uint256 positionId,
        externalEuint32 _currentPrice,
        externalEuint32 _profit,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(positions[positionId].trader == msg.sender, "Only position owner can close");
        require(positions[positionId].trader != address(0), "Position does not exist");
        
        // Convert external encrypted values to internal
        euint32 internalCurrentPrice = FHE.fromExternal(_currentPrice, inputProof);
        euint32 internalProfit = FHE.fromExternal(_profit, inputProof);
        
        // Update position
        positions[positionId].currentPrice = internalCurrentPrice;
        positions[positionId].isOpen = FHE.asEbool(false);
        
        // Update trader balance
        traderBalance[msg.sender] = FHE.add(traderBalance[msg.sender], internalProfit);
        
        emit PositionClosed(positionId, msg.sender, 0); // FHE.decrypt(internalProfit) - will be decrypted off-chain
        emit BalanceUpdated(msg.sender, 0); // FHE.decrypt(traderBalance[msg.sender]) - will be decrypted off-chain
        
        return positionId;
    }
    
    function updateSymbolPrice(
        string memory _symbol,
        externalEuint32 _price,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can update prices");
        require(bytes(_symbol).length > 0, "Symbol cannot be empty");
        
        euint32 internalPrice = FHE.fromExternal(_price, inputProof);
        symbolPrice[_symbol] = internalPrice;
    }
    
    function updateTraderReputation(
        address trader,
        externalEuint32 _reputation,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(trader != address(0), "Invalid trader address");
        
        euint32 internalReputation = FHE.fromExternal(_reputation, inputProof);
        traderReputation[trader] = internalReputation;
        
        emit ReputationUpdated(trader, 0); // FHE.decrypt(internalReputation) - will be decrypted off-chain
    }
    
    function getOrderInfo(uint256 orderId) public view returns (
        uint8 quantity,
        uint8 price,
        uint8 orderType,
        bool isActive,
        address trader,
        uint256 timestamp,
        string memory symbol
    ) {
        Order storage order = orders[orderId];
        return (
            0, // FHE.decrypt(order.quantity) - will be decrypted off-chain
            0, // FHE.decrypt(order.price) - will be decrypted off-chain
            0, // FHE.decrypt(order.orderType) - will be decrypted off-chain
            FHE.decrypt(order.isActive),
            order.trader,
            order.timestamp,
            order.symbol
        );
    }
    
    function getPositionInfo(uint256 positionId) public view returns (
        uint8 quantity,
        uint8 entryPrice,
        uint8 currentPrice,
        uint8 positionType,
        bool isOpen,
        address trader,
        uint256 timestamp,
        string memory symbol
    ) {
        Position storage position = positions[positionId];
        return (
            0, // FHE.decrypt(position.quantity) - will be decrypted off-chain
            0, // FHE.decrypt(position.entryPrice) - will be decrypted off-chain
            0, // FHE.decrypt(position.currentPrice) - will be decrypted off-chain
            0, // FHE.decrypt(position.positionType) - will be decrypted off-chain
            FHE.decrypt(position.isOpen),
            position.trader,
            position.timestamp,
            position.symbol
        );
    }
    
    function getTradeInfo(uint256 tradeId) public view returns (
        uint8 quantity,
        uint8 price,
        uint8 profit,
        address buyer,
        address seller,
        uint256 timestamp,
        string memory symbol
    ) {
        Trade storage trade = trades[tradeId];
        return (
            0, // FHE.decrypt(trade.quantity) - will be decrypted off-chain
            0, // FHE.decrypt(trade.price) - will be decrypted off-chain
            0, // FHE.decrypt(trade.profit) - will be decrypted off-chain
            trade.buyer,
            trade.seller,
            trade.timestamp,
            trade.symbol
        );
    }
    
    function getTraderBalance(address trader) public view returns (uint8) {
        return 0; // FHE.decrypt(traderBalance[trader]) - will be decrypted off-chain
    }
    
    function getTraderReputation(address trader) public view returns (uint8) {
        return 0; // FHE.decrypt(traderReputation[trader]) - will be decrypted off-chain
    }
    
    function getSymbolPrice(string memory symbol) public view returns (uint8) {
        return 0; // FHE.decrypt(symbolPrice[symbol]) - will be decrypted off-chain
    }
    
    function withdrawFunds(uint256 amount) public {
        require(amount > 0, "Amount must be positive");
        require(traderBalance[msg.sender] != FHE.asEuint32(0), "No balance to withdraw");
        
        // In a real implementation, funds would be transferred based on decrypted balance
        // For now, we'll just emit an event
        emit BalanceUpdated(msg.sender, 0); // FHE.decrypt(traderBalance[msg.sender]) - will be decrypted off-chain
    }
}
