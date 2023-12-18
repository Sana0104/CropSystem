package com.crop.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class CropNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public CropNotFoundException(String message){
		super(message);
	}
	
}
