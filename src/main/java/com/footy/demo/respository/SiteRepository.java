package com.footy.demo.respository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.footy.demo.items.DashboardItem;

import java.util.List;

public interface SiteRepository extends MongoRepository<DashboardItem,Long> {
    //List<DashboardItem> findByCategory(String category);
    //DashboardItem findByItemId(long itemId);
}
