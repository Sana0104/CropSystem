package com.crop;



import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.crop.entity.Crop;
import com.crop.entity.Transaction;
import com.crop.entity.TransactionRequest;
import com.crop.entity.User;
import com.crop.exception.CropNotFoundException;
import com.crop.exception.NotEnoughQuantityException;
import com.crop.exception.UserNotFoundException;
import com.crop.repository.TransactionRepository;
import com.crop.serviceImpl.TransactionServiceImpl;

@SpringBootTest
public class TransactionTest {

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private TransactionServiceImpl transactionService;

    @Test
    public void testBuyCrops() {
        // Mocking the behavior of the RestTemplate
        User user = new User();
        user.setId("1");
        user.setUserName("John Doe");

        Crop crop = new Crop();
        crop.setId("1");
        crop.setCropName("Tomato");
        crop.setPrice(2.5);
        crop.setQuantity(100);

        when(restTemplate.getForObject("http://localhost:9095/user/fetch/1", User.class)).thenReturn(user);
        when(restTemplate.getForObject("http://localhost:9091/crops/viewCropById/1", Crop.class)).thenReturn(crop);

        TransactionRequest request = new TransactionRequest();
        request.setCartId("cart1");
        request.setBuyerId("1");
        request.setCropId("1");
        request.setQuantity(10);

        ResponseEntity<Transaction> responseEntity = transactionService.buyCrops(request);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testBuyCrops_CropNotFound() {
        when(restTemplate.getForObject("http://localhost:9095/user/fetch/1", User.class)).thenReturn(new User());
        when(restTemplate.getForObject("http://localhost:9091/crops/viewCropById/1", Crop.class)).thenReturn(null);

        TransactionRequest request = new TransactionRequest();
        request.setCartId("cart1");
        request.setBuyerId("1");
        request.setCropId("1");
        request.setQuantity(10);

        try {
            transactionService.buyCrops(request);
        } catch (CropNotFoundException e) {
            assertEquals("Crop doesn't exist with id= 1", e.getMessage());
        }
    }

    @Test
    public void testBuyCrops_UserNotFound() {
        when(restTemplate.getForObject("http://localhost:9095/user/fetch/1", User.class)).thenReturn(null);

        TransactionRequest request = new TransactionRequest();
        request.setCartId("cart1");
        request.setBuyerId("1");
        request.setCropId("1");
        request.setQuantity(10);

        try {
            transactionService.buyCrops(request);
        } catch (UserNotFoundException e) {
            assertEquals("User doesn't exist with id= 1", e.getMessage());
        }
    }

   

    @Test
    public void testBuyCrops_Exception() {
        when(restTemplate.getForObject("http://localhost:9095/user/fetch/1", User.class)).thenThrow(new RuntimeException("User service unavailable"));

        TransactionRequest request = new TransactionRequest();
        request.setCartId("cart1");
        request.setBuyerId("1");
        request.setCropId("1");
        request.setQuantity(10);

        try {
            transactionService.buyCrops(request);
        } catch (RuntimeException e) {
            assertEquals("An error occurred while processing the request.", e.getMessage());
        }
    }

  
}
