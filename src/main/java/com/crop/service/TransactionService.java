package com.crop.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.crop.entity.Crop;
import com.crop.entity.Transaction;
import com.crop.entity.TransactionRequest;
import com.crop.exception.CropNotFoundException;

public interface TransactionService {

	ResponseEntity<Transaction> buyCrops(TransactionRequest request) throws CropNotFoundException;

	// List<Map<String, Object>> getAllTransactions();
	List<Transaction> getAllTransactions();

	List<Transaction> getAllCropsBought(String buyerId);
	List<Crop> getCropsByCartId(String cartId);
	ResponseEntity<String> deleteTransactionById(String cartId);

	ResponseEntity<String>deleteCropFromCart(String cartId, String cropId);

	ResponseEntity<String> updateTotalPrice(String cartId, double totalPrice);

}