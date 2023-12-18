package com.crop.entity;


import java.util.ArrayList;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection="buyer")
public class Transaction {
	
	@Id
	private String cartId;
	
	// @DBRef
	private List<Crop> crops = new ArrayList<>();
	 
	private String buyerId;
	private double quantity;
	private double totalPrice;
	private Date transactionDate;
	
	
	public List<Crop> getCrops() {
		return crops;
	}
	public void setCrops(List<Crop> crops) {
		this.crops = crops;
	}
	
	public double getQuantity() {
		return quantity;
	}
	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}
	public double getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	public Date getTransactionDate() {
		return transactionDate;
	}
	public void setTransactionDate(Date transactionDate) {
		this.transactionDate = transactionDate;
	}
	
	public double calculateTotalPrice() {
        double total = 0.0;
        for (Crop crop : crops) {
            total += crop.getPrice() * crop.getQuantity();
        }
        return total;
    }
	public String getBuyerId() {
		return buyerId;
	}
	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
	}
	public String getCartId() {
		return cartId;
	}
	public void setCartId(String cartId) {
		this.cartId = cartId;
	}
	
	
	
}

