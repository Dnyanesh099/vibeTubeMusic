package com.dnyanesh.musicapp.model;


import jakarta.persistence.*;

@Entity
public class Music {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String url;
    private String imageUrl;
    private String videoId; 
    
    
    
	public Music() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Music(Long id, String title, String url,String imageUrl, String videoId) {
		super();
		this.id = id;
		this.title = title;
		this.url = url;
		this.imageUrl=imageUrl;
		this.videoId=videoId;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getVideoId() {
		return videoId;
	}
	public void setVideoId(String videoId) {
		this.videoId = videoId;
	}
	
	

    
}
