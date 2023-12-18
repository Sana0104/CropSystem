package com.crop.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.crop.entity.Crop;
import com.crop.entity.Transaction;
import com.crop.entity.TransactionRequest;
import com.crop.entity.User;
import com.crop.exception.CropNotFoundException;
import com.crop.exception.NotEnoughQuantityException;
import com.crop.exception.UserNotFoundException;
import com.crop.repository.TransactionRepository;
import com.crop.service.TransactionService;
import com.google.common.net.HttpHeaders;
import com.google.common.net.MediaType;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {

	private static final String CROP_SERVICE_URL = "http://localhost:9091"; // Assuming the URL of the CropService
	private static final String USER_SERVICE_URL = "http://localhost:9095";
	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private TransactionRepository transactionRepository; // Assuming you have a TransactionRepository

//    @Override
//    public ResponseEntity<Transaction> buyMultipleCrops(TransactionRequest request) {
//        try {
//            List<Long> cropIds = request.getCropIds();
//            long buyerId = request.getBuyerId();
//            double quantity = request.getQuantity();
//            long tranid = request.getTranid();
//
//            List<Crop> crops = new ArrayList<>();
//            List<String> notFoundCrops = new ArrayList<>(); // Maintain a list of not found crops
//
//            for (Long id : cropIds) {
//                Crop crop = restTemplate.getForObject(CROP_SERVICE_URL + "/crops/viewCropById/" + id, Crop.class);
//                if (crop == null) {
//                    notFoundCrops.add("Crop doesn't exist with id= " + id);
//                } else {
//                    crops.add(crop);
//                }
//            }
//
//            if (!notFoundCrops.isEmpty()) {
//                throw new CropNotFoundException(String.join(", ", notFoundCrops));
//            }
//
//            Transaction transaction = new Transaction();
//            transaction.setTranid(tranid);
//            transaction.setBuyerId(buyerId);
//            transaction.setQuantity(quantity);
//            transaction.setCrops(crops); // Set the associated crops
//
//            transactionRepository.save(transaction);
//
//            return new ResponseEntity<>(transaction, HttpStatus.OK);
//        } catch (CropNotFoundException ex) {
//            // Handle exception
//            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        } catch (Exception ex) {
//            // Handle other exceptions
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

	@Override
	public ResponseEntity<Transaction> buyCrops(TransactionRequest request) {
		try {
			String cartId = request.getCartId();
			String cropId = request.getCropId();
			double transactionQuantity = request.getQuantity();

			User user = restTemplate.getForObject(USER_SERVICE_URL + "/user/fetch/" + request.getBuyerId(), User.class);
			if (user == null) {
				throw new UserNotFoundException("User doesn't exist with id= " + request.getBuyerId());
			}

			Crop crop = restTemplate.getForObject(CROP_SERVICE_URL + "/crops/viewCropById/" + cropId, Crop.class);
			if (crop == null) {
				throw new CropNotFoundException("Crop doesn't exist with id= " + cropId);
			}

			double availableQuantity = crop.getQuantity();
			if (availableQuantity < transactionQuantity) {
				throw new NotEnoughQuantityException("Not enough quantity available for the crop with id= " + cropId
						+ "\nAvailable Quantity=" + availableQuantity);
			}

			double totalPrice = crop.getPrice() * transactionQuantity;
			crop.setQuantity(availableQuantity - transactionQuantity);
			restTemplate.put(CROP_SERVICE_URL + "/crops/updateCrop/" + cropId, crop);

			Transaction existingTransaction = transactionRepository.findByCartIdAndBuyerId(cartId, user.getId());

			if (existingTransaction == null) {
				existingTransaction = new Transaction();
				existingTransaction.setCartId(cartId);
				existingTransaction.setBuyerId(user.getId());
				existingTransaction.setCrops(new ArrayList<>());
			}

			List<Crop> crops = existingTransaction.getCrops();
			crops.add(crop);
			existingTransaction.setCrops(crops);
			existingTransaction.setTransactionDate(new Date());

			double totalPriceForBuyer = existingTransaction.getTotalPrice() + totalPrice;
			existingTransaction.setTotalPrice(totalPriceForBuyer);

			transactionRepository.save(existingTransaction);

			return new ResponseEntity<>(existingTransaction, HttpStatus.OK);
		} catch (NotEnoughQuantityException ex) {
			throw ex;
		} catch (CropNotFoundException ex) {
			throw new CropNotFoundException(ex.getMessage());
		} catch (UserNotFoundException ex) {
			throw new UserNotFoundException(ex.getMessage());
		} catch (Exception ex) {
			throw new RuntimeException("An error occurred while processing the request.", ex);
		}
	}

//    @Override
//    public List<Map<String, Object>> getAllTransactions() {
//        List<Transaction> transactions = transactionRepository.findAll();
//        List<Map<String, Object>> transactionDetails = new ArrayList<>();
//
//        for (Transaction transaction : transactions) {
//            Map<String, Object> details = new HashMap<>();
//            details.put("buyerId", transaction.getBuyerId());
//            details.put("tranid", transaction.getTranid());
//            List<Map<String, Object>> cropsDetails = new ArrayList<>();
//            for (Crop crop : transaction.getCrops()) {
//                Map<String, Object> cropDetails = new HashMap<>();
//                cropDetails.put("id", crop.getId());
//                cropDetails.put("cropName", crop.getCropName());
//                cropDetails.put("cropType", crop.getCropType());
//                cropDetails.put("description", crop.getDescription());
//                cropDetails.put("price", crop.getPrice());
//                cropDetails.put("quantity", crop.getQuantity());
//                cropDetails.put("location", crop.getLocation());
//                cropsDetails.add(cropDetails);
//            }
//            details.put("crops", cropsDetails);
//            details.put("totalPrice", transaction.getTotalPrice());
//            details.put("quantity", transaction.getQuantity());
//            transactionDetails.add(details);
//        }
//
//        return transactionDetails;
//    }

	@Override
	public List<Transaction> getAllTransactions() {
		return transactionRepository.findAll();
	}

//	
//    @Override
//    public List<Transaction> getAllCropsBought(Long buyerId) {
//        List<Transaction> allTransactions = transactionRepository.findAll();
//        List<Transaction> cropsBoughtByBuyer = new ArrayList<>();
//        double totalPrice = 0.0; // Initialize the total price to zero
//
//        for (Transaction transaction : allTransactions) {
//            if (transaction.getBuyerId() == buyerId) {
//                cropsBoughtByBuyer.add(transaction);
//                for (Crop crop : transaction.getCrops()) {
//                    totalPrice += crop.getPrice() * crop.getQuantity(); // Assuming there are getPrice() and getQuantity() methods in the Crop class
//                }
//            }
//        }
//
//        System.out.println("Total price of crops bought by buyer with ID " + buyerId + " is: " + totalPrice);
//        return cropsBoughtByBuyer;
//    }

	@Override
	public ResponseEntity<String> deleteTransactionById(String cartId) {
		Transaction transaction = transactionRepository.findByCartId(cartId);
		if (transaction != null) {
			transactionRepository.delete(transaction);
			return new ResponseEntity<>("Cart with cartId " + cartId + " deleted successfully", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Cart with cartId " + cartId + " not found", HttpStatus.NOT_FOUND);
		}
	}

	@Override
	public List<Transaction> getAllCropsBought(String buyerId) {
		// TODO Auto-generated method stub
		return null;
	}
	
	 @Override
	    public List<Crop> getCropsByCartId(String cartId) {
	        Transaction transaction = transactionRepository.findByCartId(cartId);
	        if (transaction != null) {
	            return transaction.getCrops();
	        } else {
	            return null;
	        }
	    }
	 @Override
	 public ResponseEntity<String> deleteCropFromCart(String cartId, String cropId) {
		    Transaction transaction = transactionRepository.findByCartId(cartId);
		    if (transaction != null) {
		        List<Crop> crops = transaction.getCrops();
		        boolean found = false;
		        Crop cropToDelete = null;
		        for (Crop crop : crops) {
		            if (crop.getId().equals(cropId)) {
		                found = true;
		                cropToDelete = crop;
		                break;
		            }
		        }
		        if (found) {
		            crops.remove(cropToDelete);
		            transaction.setCrops(crops);
		            transactionRepository.save(transaction);
		            return new ResponseEntity<>("Crop with ID " + cropId + " deleted successfully from cart with ID " + cartId, HttpStatus.OK);
		        } else {
		            return new ResponseEntity<>("Crop with ID " + cropId + " not found in cart with ID " + cartId, HttpStatus.NOT_FOUND);
		        }
		    } else {
		        return new ResponseEntity<>("Cart with ID " + cartId + " not found", HttpStatus.NOT_FOUND);
		    }
		}
	 @Override
	 public ResponseEntity<String> updateTotalPrice(String cartId, double totalPrice) {
	     Transaction transaction = transactionRepository.findByCartId(cartId);
	     if (transaction != null) {
	         transaction.setTotalPrice(totalPrice);
	         transactionRepository.save(transaction);
	         return new ResponseEntity<>("Total price updated successfully for cart with ID " + cartId, HttpStatus.OK);
	     } else {
	         return new ResponseEntity<>("Cart with ID " + cartId + " not found", HttpStatus.NOT_FOUND);
	     }
	 }

	 
}