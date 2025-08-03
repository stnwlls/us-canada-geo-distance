# 🧭 US/Canada ZIP & Postal Code to Airport Distance Checker

This repo provides offline tools to determine whether a guest's address (US ZIP or Canadian postal code) is within **100 miles** of their departure airport. Designed for integration with **Power Automate Desktop (PAD)** or manual CLI use.

---

## 📦 What's Included

```
├── data/
│   ├── USZIPCodes.csv
│   ├── CanadianPostalCodes_AtoM.csv
│   ├── CanadianPostalCodes_NtoZ.csv
│   ├── airports.csv
│
├── json/
│   ├── us_zipcodes.json
│   ├── ca_postal_a_m.json
│   ├── ca_postal_n_z.json
│   ├── airports.json
│
├── scripts/
│   ├── convertCSVtoJSON.js
│   ├── checkDistance.js
│
└── README.md
```

---

## 🛠️ Setup Instructions

1. **Clone or Download**
   ```bash
   git clone https://github.com/stnwlls/us-canada-geo-distance.git
   cd us-canada-geo-distance
   ```

2. **Install Node.js**
   Make sure Node.js is installed:
   ```bash
   node -v
   ```

3. **Convert CSV to JSON (Only if Needed)**
   Run this only if the `json/` folder is empty or outdated:
   ```bash
   cd scripts
   node convertCSVtoJSON.js
   ```

---

## 🚀 Usage

### A. Run from CLI

```bash
cd scripts
node checkDistance.js [ZIP_OR_POSTAL_CODE] [IATA_AIRPORT_CODE]
```

Examples:

```bash
node checkDistance.js 90210 LAX
node checkDistance.js K1A0B1 YOW
```

Returns:

- `Yes` — Within 100 miles
- `No` — More than 100 miles
- `Unknown` — Missing or unmatched data

---

### B. Run from Power Automate Desktop (PAD)

Use the **Run JavaScript Function** or **Run DOS Command** action:

```cmd
node checkDistance.js %GuestPostalCode% %DepartureAirportCode%
```

Capture output (Yes/No/Unknown) and store in a PAD variable for decision logic.

---

## 📁 Data Sources

- **US ZIP Codes**: Provided by [Service Objects](https://www.serviceobjects.com/blog/free-zip-code-and-postal-code-database-with-geocoordinates/)
- **Canadian Postal Codes**: Provided by [Service Objects](https://www.serviceobjects.com/blog/free-zip-code-and-postal-code-database-with-geocoordinates/)
- **Airport Data**: Public IATA database from [OurAirports](https://ourairports.com/data/)

---

## 📌 Notes

- Canadian postal code data is split into A–M and N–Z to avoid GitHub’s 25MB file limit
- US ZIPs must be 5 digits (e.g. `90210`)
- Canadian codes must be full (e.g. `K1A 0B1`, with or without a space)
- Airport codes must be valid 3-letter IATA codes (e.g. `ORD`, `SEA`, `YYZ`)
- Haversine formula used for accurate mile-based distance

---

## ✅ Sample Workflow in PAD

1. Extract guest postal/ZIP from DOM
2. Extract departure airport (IATA)
3. Run `checkDistance.js` with both
4. Store output as `%distanceStatus%`
5. Log or branch based on result

---

## 🙋 Need Help?

If you get `Unknown`:
- Make sure postal/ZIP is valid format
- Check that airport code is correct and exists in dataset
- Ensure JSON files are built using the included converter

If you encounter issues or have questions, feel free to reach out:

[hello@austinwells.dev](mailto:hello@austinwells.dev)
