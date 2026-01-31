# 🌱 Long-Range Greenhouse Environmental Monitoring System
Live greenhouse data:   https://benb0jangles.github.io/Remote-greenhouse-monitor/     

![monitor_image1](https://github.com/benb0jangles/Remote-greenhouse-monitor/blob/main/img/2.jpg)

## Project Overview

This project implements a **long-range wireless environmental monitoring system** for precision agriculture and horticultural research. It enables real-time tracking of critical growing conditions in a greenhouse located **3 kilometers away** from the monitoring station, using low-power LoRa mesh networking technology.

## The Challenge

Understanding optimal growing conditions for different plants requires comprehensive environmental data collection over extended periods. Traditional greenhouse monitoring systems are limited by:

- **Range limitations**: WiFi and Bluetooth don't reach beyond ~100 meters
- **Power requirements**: Continuous monitoring needs reliable power in remote locations
- **Data accessibility**: Local storage requires physical access to retrieve data
- **Long-term analysis**: Studying seasonal patterns requires months or years of data

This project solves these challenges using long-range radio technology, solar power, and cloud-based data storage.

## What It Does

The system continuously monitors five critical environmental parameters that directly impact plant growth and health:

### 1. **Temperature** (°C)
- **Why it matters**: Controls photosynthesis rates, respiration, germination, and flowering
- **Insights gained**: Identify optimal temperature ranges for different crops, detect frost risk, understand seasonal variations
- **Growing applications**: Determine which vegetables tolerate cool springs, when to plant heat-loving crops, thermal mass requirements

### 2. **Relative Humidity** (%)
- **Why it matters**: Affects transpiration, disease susceptibility, pollination, and water uptake
- **Insights gained**: Prevent fungal diseases (caused by high humidity), optimize watering schedules, understand vapor pressure deficit (VPD)
- **Growing applications**: Select humidity-tolerant plants, plan ventilation needs, prevent blossom-end rot in tomatoes

### 3. **Barometric Pressure** (hPa)
- **Why it matters**: Correlates with weather patterns, affects plant stress responses
- **Insights gained**: Predict incoming weather changes, correlate plant growth with atmospheric conditions
- **Growing applications**: Understand how pressure changes affect transplant success, correlate yield with weather patterns

### 4. **Light Intensity** (lux)
- **Why it matters**: Drives photosynthesis, controls photoperiod responses, affects stem elongation
- **Insights gained**: Calculate daily light integral (DLI), understand seasonal light availability, identify shading issues
- **Growing applications**: Determine if supplemental lighting is needed, understand which crops suit low-light periods (leafy greens vs. fruiting crops)

### 5. **Soil Moisture** (%)
- **Why it matters**: Essential for nutrient uptake, controls plant water stress, affects root development
- **Insights gained**: Optimize irrigation schedules, understand soil water retention, detect drainage issues
- **Growing applications**: Prevent over/under-watering, select drought-tolerant varieties, optimize potting mix composition

## Real-World Applications

### Crop Selection & Planning
By analyzing year-long environmental data, you can:
- Determine which crops thrive in each season (e.g., lettuce in cool spring, tomatoes in summer)
- Identify "shoulder seasons" where transitional crops perform best
- Plan succession planting based on historical temperature and light data
- Select varieties suited to your microclimate

### Problem Diagnosis
Historical data helps identify causes of poor growth:
- Low yields? Check if light levels were sufficient
- Disease problems? Review humidity patterns during the growing period
- Slow germination? Compare soil temperature to optimal ranges
- Wilting plants? Analyze soil moisture trends

### Climate Optimization
Over time, you can:
- Understand thermal mass effects (how materials store/release heat)
- Optimize ventilation timing based on temperature/humidity patterns
- Plan shading strategies based on summer light intensity
- Design heating systems based on winter temperature data

### Research & Experimentation
- Compare growth rates under different environmental conditions
- Test microclimates within the greenhouse (north vs. south side)
- Validate growing guides against actual local conditions
- Share data with other growers in your climate zone

## UK Growing Conditions Reference Guide

### Typical UK Greenhouse Environmental Conditions (Monthly Averages)

| Month | Avg Temp (°C) | Min/Max (°C) | Daylight Lux | Day Length | Best For |
|-------|---------------|--------------|--------------|------------|----------|
| **January** | 4-8°C | 0-12°C | 5,000-15,000 | 8 hours | Overwintering crops, planning |
| **February** | 4-9°C | 0-14°C | 10,000-25,000 | 10 hours | Early seed starting (heated) |
| **March** | 6-12°C | 2-16°C | 20,000-40,000 | 12 hours | Cool-season crops, transplants |
| **April** | 8-15°C | 4-20°C | 30,000-50,000 | 14 hours | Spring planting peak |
| **May** | 12-19°C | 8-24°C | 40,000-60,000 | 16 hours | Warm-season transplanting |
| **June** | 15-22°C | 11-28°C | 50,000-80,000 | 17 hours | Peak growing, fruiting crops |
| **July** | 17-25°C | 13-32°C | 50,000-80,000 | 16 hours | Harvest, heat management |
| **August** | 17-24°C | 13-30°C | 40,000-70,000 | 14 hours | Late summer crops, succession |
| **September** | 14-20°C | 10-24°C | 30,000-50,000 | 12 hours | Autumn crops, extending season |
| **October** | 10-15°C | 6-18°C | 20,000-35,000 | 10 hours | Cool-season revival |
| **November** | 7-11°C | 3-14°C | 10,000-20,000 | 8 hours | Hardy greens, protection |
| **December** | 4-8°C | 0-12°C | 5,000-15,000 | 7 hours | Winter harvest, dormancy |

**Note**: Greenhouse values typically 5-10°C warmer than outdoor temps; lux values are for bright days (overcast ~30-50% of maximum).

### Crop Selection Guide by Environmental Requirements

#### Cool-Season Crops (Thrive in 7-18°C)

| Crop | Optimal Temp | Humidity | Soil Moisture | Light Requirement | Best Months (UK) |
|------|--------------|----------|---------------|-------------------|------------------|
| **Lettuce** | 10-18°C | 50-70% | 60-75% | 20,000-40,000 lux | Mar-May, Sep-Nov |
| **Spinach** | 10-18°C | 50-70% | 65-80% | 15,000-35,000 lux | Mar-May, Sep-Oct |
| **Rocket (Arugula)** | 10-20°C | 50-70% | 60-75% | 15,000-30,000 lux | Mar-Nov |
| **Kale** | 7-18°C | 50-70% | 60-75% | 20,000-40,000 lux | Year-round |
| **Chard** | 10-20°C | 50-70% | 65-80% | 20,000-40,000 lux | Mar-Nov |
| **Peas** | 10-18°C | 50-65% | 60-70% | 30,000-50,000 lux | Mar-May, Aug-Sep |
| **Radish** | 10-18°C | 50-70% | 60-70% | 20,000-40,000 lux | Mar-May, Sep-Oct |
| **Broad Beans** | 10-18°C | 50-65% | 60-70% | 30,000-50,000 lux | Feb-Apr, Oct-Nov |
| **Cabbage** | 12-20°C | 50-70% | 65-80% | 30,000-50,000 lux | Mar-May, Aug-Oct |
| **Broccoli** | 12-20°C | 50-70% | 65-80% | 30,000-50,000 lux | Mar-May, Aug-Sep |

#### Warm-Season Crops (Thrive in 18-30°C)

| Crop | Optimal Temp | Humidity | Soil Moisture | Light Requirement | Best Months (UK) |
|------|--------------|----------|---------------|-------------------|------------------|
| **Tomatoes** | 20-26°C | 60-70% | 65-80% | 50,000-70,000 lux | May-Sep |
| **Cucumbers** | 22-28°C | 70-85% | 75-85% | 40,000-60,000 lux | May-Sep |
| **Peppers** | 21-27°C | 60-70% | 65-75% | 50,000-70,000 lux | May-Sep |
| **Aubergine (Eggplant)** | 22-28°C | 60-70% | 70-80% | 50,000-70,000 lux | Jun-Sep |
| **Courgette (Zucchini)** | 20-26°C | 60-75% | 70-80% | 50,000-70,000 lux | May-Sep |
| **Melons** | 24-30°C | 60-70% | 70-80% | 60,000-80,000 lux | Jun-Aug |
| **Basil** | 20-25°C | 60-70% | 65-75% | 40,000-60,000 lux | May-Sep |
| **Beans (French)** | 18-24°C | 60-70% | 65-75% | 40,000-60,000 lux | May-Sep |

#### Moderate/Transitional Crops (Flexible 12-24°C)

| Crop | Optimal Temp | Humidity | Soil Moisture | Light Requirement | Best Months (UK) |
|------|--------------|----------|---------------|-------------------|------------------|
| **Carrots** | 15-20°C | 50-70% | 60-70% | 25,000-40,000 lux | Mar-Sep |
| **Beetroot** | 15-20°C | 50-70% | 65-75% | 25,000-40,000 lux | Apr-Sep |
| **Pak Choi** | 15-22°C | 60-75% | 70-80% | 25,000-45,000 lux | Apr-Oct |
| **Coriander** | 15-22°C | 50-70% | 65-75% | 25,000-40,000 lux | Mar-Oct |
| **Parsley** | 15-22°C | 50-70% | 65-75% | 20,000-40,000 lux | Mar-Oct |
| **Spring Onions** | 12-20°C | 50-70% | 60-70% | 25,000-40,000 lux | Mar-Oct |

### Understanding Your Sensor Readings

#### Temperature Zones

- **Below 5°C**: Risk of frost damage to most crops; only hardy greens and overwintering varieties
- **5-10°C**: Cool-season crops grow slowly; good for hardening off transplants
- **10-18°C**: Optimal for cool-season crops (lettuce, spinach, peas, brassicas)
- **18-25°C**: Ideal for most vegetables; warm-season crops grow actively
- **25-30°C**: Peak for heat-loving crops (tomatoes, peppers, cucumbers, melons)
- **Above 30°C**: Stress conditions; ventilation and shading needed; pollination issues in tomatoes

#### Humidity Management

- **Below 40%**: Very dry; increases water stress, spider mites thrive, poor germination
- **40-50%**: Low humidity; acceptable for established plants, increases watering needs
- **50-70%**: **Optimal for most crops**; good transpiration, disease prevention
- **70-85%**: High humidity; good for cucumbers/tropical crops, ventilation important
- **Above 85%**: Fungal disease risk (botrytis, powdery mildew); increase ventilation

#### Soil Moisture Interpretation

- **Below 40%**: Dry; plants show water stress, wilting; urgent irrigation needed
- **40-55%**: Slightly dry; okay for drought-tolerant crops (tomatoes, peppers)
- **55-70%**: **Optimal for most crops**; good balance of water and air in soil
- **70-85%**: Moist; good for water-loving crops (cucumbers, lettuce, celery)
- **Above 85%**: Waterlogged; root rot risk, poor oxygen; improve drainage

#### Light Levels (Lux) Guide

- **Below 10,000 lux**: Deep winter; supplemental lighting needed for growth
- **10,000-20,000 lux**: Low light; suitable for leafy greens, herbs, microgreens
- **20,000-40,000 lux**: Moderate light; good for cool-season crops, transplants
- **40,000-60,000 lux**: High light; needed for fruiting crops, peak growth
- **Above 60,000 lux**: Very high; optimal for tomatoes, peppers, melons; shading may be needed above 80,000

**Daily Light Integral (DLI)**: Calculate from your data
- **DLI = (average lux × hours of light) / 93,500**
- Target: 12-20 mol/m²/day for fruiting crops, 6-12 for leafy greens

### Practical Use Cases with Your Data

#### Example 1: Planning Tomato Growing Season
Look at your historical data:
1. **When does temperature reliably stay above 15°C at night?** → Safe to transplant
2. **When does light exceed 40,000 lux consistently?** → Good fruit set
3. **Does summer humidity stay below 75%?** → Blossom end rot prevention
4. **Soil moisture patterns** → How often to water (target 65-75%)

#### Example 2: Extending Cool-Season Crops
Check your autumn data:
1. **When does temperature drop below 18°C?** → Start lettuce/spinach
2. **Light levels in September-October** → Can you grow without supplemental light?
3. **First frost date** (temp < 2°C) → When to protect or harvest

#### Example 3: Optimizing Year-Round Production
Analyze your annual patterns:
- **December-February** (low light): Microgreens, hardy salads (with grow lights)
- **March-April** (warming up): Start transplants, cool-season crops
- **May-September** (peak season): Warm-season fruiting crops
- **October-November** (cooling down): Second crop of cool-season vegetables

### Warning Thresholds to Monitor

Set up alerts (via ThingSpeak) for:
- **Temperature < 2°C**: Frost warning (protect crops or add heat)
- **Temperature > 32°C**: Heat stress (increase ventilation, shade)
- **Humidity > 85%** for 6+ hours: Disease risk (improve air circulation)
- **Soil moisture < 45%**: Irrigation needed
- **Soil moisture > 85%**: Drainage issue (reduce watering)
- **Light < 15,000 lux** average in growing season: Consider supplemental lighting

## How It Works

### Hardware Components

**Greenhouse Sensor Node (Remote Location - 3km away)**:
- **Microcontroller**: Seeed nRF52840 (low-power Nordic chipset)
- **Radio**: Semtech SX1262 LoRa transceiver (long-range, low-power)
- **Sensors**:
  - BME280: Temperature, humidity, barometric pressure
  - VEML7700: Ambient light intensity (lux)
  - ADS1115 + Capacitive sensor: Soil moisture
- **Power**: Solar panel + CN3065 charge controller + 18650 Li-ion battery (3400mAh)
- **Firmware**: Custom Meshtastic firmware with additional sensor support

**House Monitoring Node (Home Location)**:
- **Microcontroller**: Seeed ESP32-S3 (WiFi + processing power)
- **Radio**: Semtech SX1262 LoRa transceiver
- **Power**: USB mains power (24/7 operation)
- **Role**: Receives sensor data via LoRa, bridges to internet

**Data Bridge** (converts LoRa data to internet):
- **Hardware**: ESP32 or ESP8266 development board
- **Connection**: USB serial to house node
- **Function**: Publishes sensor data to ThingSpeak cloud platform

### Software Components

- **Meshtastic**: Open-source LoRa mesh networking firmware (handles long-range radio communication)
- **ThingSpeak**: IoT data platform by MathWorks (stores sensor data, provides APIs)
- **GitHub Pages**: Free web hosting (displays live graphs and historical data)
- **Chart.js**: JavaScript graphing library (creates interactive visualizations)

### Data Flow

```
Greenhouse Sensors → nRF52840 Node → LoRa (3km) → ESP32-S3 House Node
     → USB Serial → ESP32 Bridge → WiFi → ThingSpeak Cloud
     → Internet → GitHub Pages Website → Your Browser
```

## Viewing Your Data

The live dashboard displays:
- **Current readings**: Real-time values for all five sensors
- **Interactive graphs**: Zoom, pan, hover for details
- **Time ranges**: View data over 24 hours, 7 days, 30 days, or 1 year
- **Historical patterns**: Analyze seasonal trends and daily cycles

Access your dashboard at: `https://yourusername.github.io/your-repo-name/`

## Key Features

- **Long-range**: 3km+ range using LoRa radio (vs. ~30m for WiFi)
- **Low power**: Solar-powered greenhouse node operates indefinitely
- **Reliable**: Mesh networking provides redundancy and extended range
- **Cloud-based**: Data accessible from anywhere with internet
- **Free**: No subscription fees (uses free tiers of ThingSpeak and GitHub Pages)
- **Expandable**: Add more sensor nodes to monitor multiple locations
- **Open-source**: Fully customizable and hackable

## Technologies Used

- **LoRa (Long Range Radio)**: Sub-GHz ISM band, up to 10km+ range
- **Meshtastic Protocol**: Decentralized mesh networking for resilience
- **I2C Sensors**: Industry-standard digital sensor interface
- **Solar Power**: Renewable energy for off-grid operation
- **Cloud IoT**: Centralized data storage and API access
- **Static Web Hosting**: Fast, free, and reliable data visualization

## Future Enhancements

- **Alerts**: SMS/email notifications for frost warnings, low soil moisture, etc.
- **Automation**: Control irrigation, fans, heaters based on sensor data
- **Machine learning**: Predict optimal harvest times, yield forecasting
- **Multi-node**: Monitor multiple zones within the greenhouse
- **Integration**: Export data to spreadsheets for detailed analysis

---

**License**: MIT
**Author**: Greenhouse Grower benb0jangles
**Last Updated**: 2026-01-30
