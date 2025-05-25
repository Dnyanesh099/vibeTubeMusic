package com.dnyanesh.musicapp.repository;


import com.dnyanesh.musicapp.model.Music;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MusicRepository extends JpaRepository<Music, Long> {
	
}
