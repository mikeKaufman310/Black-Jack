package main.java.com.backend;
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    public void setSuccess(boolean s){
        success = s;
    }
    public void setMessage(String m){
        message = m;
    }
    public void setData(T t){
        data = t;
    }
}