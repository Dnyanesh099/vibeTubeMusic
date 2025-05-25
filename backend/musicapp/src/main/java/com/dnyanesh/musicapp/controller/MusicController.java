package com.dnyanesh.musicapp.controller;


import com.dnyanesh.musicapp.model.Music;
import com.dnyanesh.musicapp.repository.MusicRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/music")
@CrossOrigin(origins = "*")
public class MusicController {

    private final MusicRepository musicRepository;

    public MusicController(MusicRepository musicRepository) {
        this.musicRepository = musicRepository;
    }

    @GetMapping
    public List<Music> getAllMusic() {
        return musicRepository.findAll();
    }
}
