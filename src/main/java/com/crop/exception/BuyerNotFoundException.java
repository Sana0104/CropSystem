package com.crop.exception;

public class BuyerNotFoundException extends RuntimeException {
	public BuyerNotFoundException (String msg) {
		super(msg);
	}

}
