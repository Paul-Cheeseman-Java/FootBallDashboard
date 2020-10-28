package com.footy.demo.items;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "projects")
public class DashboardItem {

	 @Id
	 private String id;
	
	 private String season;
	 private String transfer_window;
	 private String player_name;
	 private String league_moving_from;
	 private String club_moving_from;
	 private String league_moving_to;
	 private String club_moving_to;
	 private String fee;
	 private String date;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getSeason() {
		return season;
	}
	public void setSeason(String season) {
		this.season = season;
	}
	public String getTransfer_window() {
		return transfer_window;
	}
	public void setTransfer_window(String transfer_window) {
		this.transfer_window = transfer_window;
	}
	public String getPlayer_name() {
		return player_name;
	}
	public void setPlayer_name(String player_name) {
		this.player_name = player_name;
	}
	public String getLeague_moving_from() {
		return league_moving_from;
	}
	public void setLeague_moving_from(String league_moving_from) {
		this.league_moving_from = league_moving_from;
	}
	public String getClub_moving_from() {
		return club_moving_from;
	}
	public void setClub_moving_from(String club_moving_from) {
		this.club_moving_from = club_moving_from;
	}
	public String getLeague_moving_to() {
		return league_moving_to;
	}
	public void setLeague_moving_to(String league_moving_to) {
		this.league_moving_to = league_moving_to;
	}
	public String getClub_moving_to() {
		return club_moving_to;
	}
	public void setClub_moving_to(String club_moving_to) {
		this.club_moving_to = club_moving_to;
	}
	public String getFee() {
		return fee;
	}
	public void setFee(String fee) {
		this.fee = fee;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	 
}
