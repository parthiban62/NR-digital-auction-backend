## Problem
We are presenting an idea of a web digital Auction which will help its users to facilitate auctions online.

## Proposed Solution
Setup Auction by category with slots i.e by specifying a start and end time. Dynamic bidding to each sale auction item. Realtime updates while placing bids. Dynamic closing of bid.

## Features
* Signup and Signin for user management
* User Profile Details
* Forgot Password
* View all Auctions & Place Bid
* Create new Auction by assigning a specific slot time when auction begins
* Set base bidding amount
* Set bid increment amount 
* Real time updates for Biddings place by various users


## Future Enhancements
1. Payment Integration - User would be able to pay the placed bid and other charges via online payment channel
2. White-labeling - setting it up for different companies/organisations


## Technology Stack
* React Native (Front End)
* Node JS(Back End)
* Hosted details: https://main.d2xbwawdc9i1z6.amplifyapp.com/

## How it Works
### How the data is stored
* We have used redis database to store the details
   * The auction item data is stored in various keys and various data types.
   * sample data as follows, each item will be having a reference to the auction.
   * auctionItemName: Name of the item
   * description: description of the item
   * lotNo: Lot number
   * quantity: no of items quantity
   * buyersPremium: Premium placed by the buyer
   * itemUnit: 
   * minBidAmount: minimum bidding amount
   * currentBid: current bidding amount
   * bidIncrement: Next increment value for bidding
   * startDateTime: Datetime on which the auction begins
   * sellerName: name of the seller
   * sellerEmail: email of the seller
   * sellerPhone: Phone number of the seller
   * sellerAddress: Address of the seller
   * images: array of images related to the item
   * auctionId: reference to auction

## Installation
Installation steps:
### Prerequisites

- Node JS
- NPM

* To run the App,<br> 
    **1.** npm install.<br>
    **2.** npm build.<br>
    **3.** npm start.<br>


## App Details
* Demo Link:[Digital Auction App](https://main.d2xbwawdc9i1z6.amplifyapp.com/)
* Screenshots <br>
