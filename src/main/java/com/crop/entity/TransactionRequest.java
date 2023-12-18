package com.crop.entity;

import java.util.List;

public class TransactionRequest {
	private String cartId;
    //private List<Long> cropIds;
    private String cropId;
    private String buyerId;
    private double quantity;

    // Constructors, getters, and setters

//    public List<Long> getCropIds() {
//        return cropIds;
//    }

   

//	public void setCropIds(List<Long> cropIds) {
//        this.cropIds = cropIds;
//    }

   

   

	

	

	

    public String getCropId() {
		return cropId;
	}

	public String getCartId() {
		return cartId;
	}

	public void setCartId(String cartId) {
		this.cartId = cartId;
	}

	public void setCropId(String cropId) {
		this.cropId = cropId;
	}

	public String getBuyerId() {
		return buyerId;
	}

	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
	}

	public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }
}

