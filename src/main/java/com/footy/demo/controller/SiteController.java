package com.footy.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.footy.demo.items.DashboardItem;
import com.footy.demo.service.DashboardItemService;

import java.util.List;

@RestController
public class SiteController {

    @Autowired
    DashboardItemService itemService;

    
	int count=0;
    
    @RequestMapping("/getAllItems")
    @ResponseBody
    public List<DashboardItem> getItems(){
    	for(DashboardItem dbi : itemService.getAllItems()) {
    		count+=1;
    		System.out.println(dbi.getPlayer_name());
    		if (count==5) {
    			break;
    		}
    	}
    	
        return itemService.getAllItems();
    }


    
}
