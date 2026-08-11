# Kissan Oil Connect

Build a Production-Ready Used Cooking Oil (UCO) Collection Management Platform

Project Name

Kissan UCO Connect

Objective

Build a modern, responsive web and mobile application for Kissan Energy India Pvt. Ltd. to manage the collection of Used Cooking Oil (UCO) across India.

The platform should allow restaurants, hotels, aggregators, collection partners, drivers, and administrators to manage the complete UCO collection lifecycle from registration to pickup and reporting.

The UI should be clean, modern, fast, and enterprise-grade, similar to Zoho CRM or Kylas CRM.

User Roles

1. Super Admin

Full access

Manage all users

View nationwide dashboard

Approve KYC

Assign pickup requests

Manage pricing

View reports

Export data

Manage states and collection zones

2. State Manager

View data for assigned state

Approve vendors

Allocate pickup teams

Monitor collections

View reports

3. Collection Executive

Visit restaurants

Register new vendors

Upload KYC

Create pickup requests

Update drum count

Capture live GPS

Upload collection photos

4. Driver

View assigned pickups

Navigation using Google Maps

Start trip

Complete trip

Capture customer signature

Upload delivery photo

5. Restaurant / Vendor

Register

Upload KYC

Raise pickup request

Track pickup status

View collection history

Download receipts

Vendor Registration

Collect the following information:

Business Name

Owner Name

Mobile Number (OTP Verification)

Email

GST Number

FSSAI License

PAN Number

Aadhaar Number

Restaurant Type

Address

City

District

State

PIN Code

Google Map Location

Latitude

Longitude

Average Monthly UCO Generation (Kg)

Number of Fryers

Working Days

Preferred Pickup Days

Preferred Pickup Time

Bank Account Details

Cancelled Cheque Upload

UPI ID

Referral Code

Vendor Category

Status

KYC Module

Upload

GST Certificate

PAN Card

Aadhaar Front

Aadhaar Back

FSSAI License

Business Photo

Kitchen Photo

Owner Photo

Cancelled Cheque

Digital Signature

All documents should support:

Preview

Zoom

Download

Approve

Reject

Resubmit

Document expiry reminders

Pickup Request

Vendor can request collection.

Fields:

Pickup Date

Expected Quantity (Kg)

Number of Drums

Drum Size

Oil Type

Remarks

Emergency Pickup

Preferred Time

Generate Pickup ID automatically.

Example:

PKP-2026-000125

Collection Module

Collection Executive should record:

Actual Quantity Collected

Number of Filled Drums

Number of Empty Drums Returned

Oil Quality

FFA %

Moisture %

Impurity %

Temperature

Collection Photo

Vehicle Number

Driver Name

GPS Location

Time In

Time Out

Digital Signature

Generate Collection Receipt PDF.

Inventory Module

Track:

Drum Inventory

Filled Drums

Empty Drums

Damaged Drums

Lost Drums

Warehouse Stock

Transit Stock

State-wise Inventory

Each drum should have:

QR Code

Unique Drum ID

Current Location

Status

History

Vehicle Management

Maintain:

Vehicle Number

Driver

Capacity

Current Location

Assigned Pickups

Fuel Consumption

Trip History

Maintenance

Insurance Expiry

Fitness Expiry

GPS Tracking

Route Optimization

Integrate Google Maps.

Optimize pickups based on:

Distance

Vehicle Capacity

Traffic

Priority Vendor

Emergency Pickup

Show route on map.

Dashboard

Show live analytics:

Today's Collection

Monthly Collection

State-wise Collection

City-wise Collection

Vendor Count

Active Vendors

Pending Pickups

Completed Pickups

Rejected KYC

Pending KYC

Collection by Executive

Collection by Driver

Top Cities

Top Vendors

Average Collection

Revenue

Carbon Emission Saved

Biodiesel Produced

Interactive charts and maps.

Search & Filters

Search by:

Vendor

Phone

GST

State

City

Executive

Pickup ID

Vehicle

Driver

Date

Status

Quantity

Reports

Generate reports for:

Daily Collection

Monthly Collection

Executive Performance

Driver Performance

Vendor Performance

State-wise Collection

District-wise Collection

Inventory

Payments

Pending Pickups

Rejected KYC

Export to:

Excel

CSV

PDF

Notifications

SMS

Email

WhatsApp

Push Notifications

Alerts for:

Pickup Assigned

Pickup Completed

KYC Approved

KYC Rejected

Payment Done

Document Expiry

Upcoming Pickup

Payment Module

Maintain:

Vendor Rate

Rate History

Collection Amount

Pending Payments

Paid Payments

Invoice

Receipt

Bank Transfer Status

UPI Payment Status

Payment Reports

CRM Module

Lead

Qualified

Registered

KYC Pending

KYC Approved

Pickup Started

Regular Vendor

Inactive Vendor

Lost Vendor

Notes

Follow-ups

Tasks

Reminder Calls

QR Code

Generate QR Code for every vendor.

When scanned:

Vendor Details

Collection History

Pending Pickup

Current Drum Status

Mobile Features

Offline Mode

GPS Tracking

Camera Upload

Barcode Scanner

QR Scanner

OTP Login

Dark Mode

Voice Notes

Hindi & English Language Support

Security

Role-based Access

OTP Login

JWT Authentication

Encrypted Documents

Audit Logs

Two-Factor Authentication for Admin

Technology Stack

Frontend:

React

Next.js

Tailwind CSS

TypeScript

Backend:

Supabase

Authentication:

OTP Login

Email Login

Storage:

Supabase Storage

Maps:

Google Maps API

Notifications:

WhatsApp API

SMS API

Email API

Charts:

Recharts

PDF:

PDF Generator

QR Code:

QR Code Generator

UI Design

Use a professional enterprise dashboard.

Theme:

White

Green (#0F8A5F)

Dark Gray

Rounded cards

Modern tables

Charts

Interactive India Map

Responsive layout

Mobile-first

Future AI Features

AI prediction of next pickup date based on historical collection.

AI route optimization.

AI fraud detection for fake collection entries.

AI dashboard with collection forecasts.

AI vendor scoring based on consistency.

AI chatbot for vendor support.

Final Deliverable

Generate a complete production-ready application with:

Responsive web app

Mobile-friendly interface

Clean code

Scalable database schema

API integrations

Sample data

Authentication

Admin dashboard

Vendor portal

Driver portal

Collection executive portal

PDF reports

QR code functionality

Google Maps integration

KYC workflow

Real-time dashboards

The application should be deployment-ready with a professional UI suitable for nationwide operations managing over 100,000 vendors and millions of kilograms of Used Cooking Oil annually.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://oil-flow-nation.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9bafe20c-abc9-481d-b607-56399b1040b2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
