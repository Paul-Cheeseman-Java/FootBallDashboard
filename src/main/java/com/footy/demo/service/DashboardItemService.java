package com.footy.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.footy.demo.respository.SiteRepository;
import com.footy.demo.items.DashboardItem;

@Service
public class DashboardItemService {

    @Autowired
    SiteRepository itemRepo;
    
    public List<DashboardItem> getAllItems(){
        return itemRepo.findAll();

    }
	
}
