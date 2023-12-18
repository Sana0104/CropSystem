package com.crop.exception;

public class NotEnoughQuantityException extends RuntimeException {
	public NotEnoughQuantityException(String msg) {
		super(msg);
	}

}
