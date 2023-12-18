package com.crop.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.crop.entity.Crop;
import com.crop.entity.Transaction;

public interface TransactionRepository extends MongoRepository<Transaction, Long> {

	Transaction findByBuyerId(String buyerId);
	// Add custom query methods if needed

	//Transaction findByTranidAndBuyerId(String cartId, String buyerId);

	//Transaction findByTranid(String cartId);

	Transaction findByCartId(String cartId);

	Transaction findByCartIdAndBuyerId(String cartId, String id);
}
