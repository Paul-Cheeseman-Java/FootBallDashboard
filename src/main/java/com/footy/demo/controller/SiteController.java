package com.footy.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import com.footy.demo.service.DashboardItemService;

@Controller
public class SiteController {

    @Autowired
    DashboardItemService itemService;

    
	int count=0;
    
	   @GetMapping(value = "/")
	   public String home() {
		   return "index";
	   }
    
	   @GetMapping(value = "/about")
	   public String about() {
		   return "about";
	   }
	   
	   
	   @GetMapping(value = "/data")
	   public String data() {
		   return "data";
	   }
	   
	   
}
