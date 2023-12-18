package com.crop.exceptionhandler;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.crop.exception.CropNotFoundException;
import com.crop.exception.NotEnoughQuantityException;
import com.crop.exception.UserNotFoundException;





@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CropNotFoundException.class)
    public ResponseEntity<Object> handleCropNotFoundException(CropNotFoundException ex, WebRequest request) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", new Date());
        body.put("message", "Crop not found");
        // Add any other information you want to include in the response

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NotEnoughQuantityException.class)
    public ResponseEntity<Object> handleNotEnoughQuantityException(NotEnoughQuantityException ex, WebRequest request) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", new Date());
        body.put("message", ex.getMessage());
        // Add any other information you want to include in the response

        return new ResponseEntity<>(body, HttpStatus.CONFLICT);
    }
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException ex, WebRequest request) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", new Date());
        body.put("message", "User not found");
        // Add any other information you want to include in the response

        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    // Other exception handling methods

    // Handle generic exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGenericException(Exception ex, WebRequest request) {
        Map<String, Object> body = new LinkedHashMap<>();
        
        body.put("message", "User not found");
        // Add any other information you want to include in the response

        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
