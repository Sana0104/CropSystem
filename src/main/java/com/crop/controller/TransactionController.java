package com.crop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.crop.entity.Crop;
import com.crop.entity.Transaction;
import com.crop.entity.TransactionRequest;
import com.crop.exception.CropNotFoundException;
import com.crop.service.TransactionService;

@RestController
@RequestMapping("/transaction")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    @Autowired
    TransactionService transactionService;
    
    
    @PostMapping("/buyCrops/userId/{buyerId}/cropId/{cropId}")
    public ResponseEntity<Transaction> buyCrops(@PathVariable String buyerId, @PathVariable String cropId, @RequestBody TransactionRequest request) {
        try {
        	
            request.setBuyerId(buyerId);
            request.setCropId(cropId);
            return transactionService.buyCrops(request);
        } catch (CropNotFoundException ex) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/allTransactions")
    public List<Transaction> getAllTransactionsDetails(){
        return transactionService.getAllTransactions();
    }
    @GetMapping("/getCropsByCartId/{cartId}")
    public ResponseEntity<List<Crop>> getCropsByCartId(@PathVariable String cartId) {
        List<Crop> crops = transactionService.getCropsByCartId(cartId);
        if (crops != null) {
            return new ResponseEntity<>(crops, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteTransaction/{cartId}")
    public ResponseEntity<String> deleteTransactionById(@PathVariable String cartId) {
        return transactionService.deleteTransactionById(cartId);
    }
    @DeleteMapping("/deleteCropFromCart/{cartId}/{cropId}")
    public ResponseEntity<String> deleteCropFromCart(@PathVariable String cartId, @PathVariable String cropId) {
        try {
            ResponseEntity<String> result = transactionService.deleteCropFromCart(cartId, cropId);
            if (result.getStatusCode() == HttpStatus.OK) {
                return new ResponseEntity<>("Crop deleted successfully from the cart.", HttpStatus.OK);
            } else if (result.getStatusCode() == HttpStatus.NOT_FOUND) {
                return new ResponseEntity<>("Crop not found in the cart.", HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>("Failed to delete the crop from the cart.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/updateTotalPrice")
    public ResponseEntity<String> updateTotalPrice(@RequestParam String cartId, @RequestParam double totalPrice) {
        try {
            return transactionService.updateTotalPrice(cartId, totalPrice);
        } catch (Exception ex) {
            return new ResponseEntity<>("An error occurred while updating the total price for cart with ID " + cartId, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
