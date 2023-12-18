package com.crop.exceptionhandler;
//
import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.crop.exception.CropNotFoundException;
import com.crop.exception.NotEnoughQuantityException;
import com.crop.exception.UserNotFoundException;
import org.springframework.http.HttpHeaders;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({CropNotFoundException.class, UserNotFoundException.class, NotEnoughQuantityException.class})
    protected ResponseEntity<Object> handleCustomExceptions(RuntimeException ex, WebRequest request) {
        String errorMessage = ex.getMessage();
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        if (ex instanceof CropNotFoundException || ex instanceof UserNotFoundException) {
            status = HttpStatus.NOT_FOUND;
        }

        ApiError apiError = new ApiError(status, errorMessage, ex);
        return new ResponseEntity<>(apiError, new HttpHeaders(), apiError.getStatus());
    }

    // Other exception handling methods can be added here as needed

    static class ApiError {
        private HttpStatus status;
        private String message;
        private String error;

        public ApiError(HttpStatus status, String message, Throwable ex) {
            this.status = status;
            this.message = message;
            this.error = ex.getLocalizedMessage();
        }

        public HttpStatus getStatus() {
            return status;
        }

        public String getMessage() {
            return message;
        }

        public String getError() {
            return error;
        }
    }
}
