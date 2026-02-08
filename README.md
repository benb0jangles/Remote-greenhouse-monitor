![grovia_logo](https://github.com/benb0jangles/Remote-greenhouse-monitor/blob/main/img/grovia_logo1.png)


# 🌱 Long-Range Greenhouse Environmental Monitoring System
Live greenhouse data:   https://benb0jangles.github.io/Remote-greenhouse-monitor/     

![monitor_image1](https://github.com/benb0jangles/Remote-greenhouse-monitor/blob/main/img/3.jpg)

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

![monitor_image2](https://github.com/benb0jangles/Remote-greenhouse-monitor/blob/main/img/1.jpg)

#### Warm-Season Crops (Thrive in 18-30°C)

![monitor_image3](https://github.com/benb0jangles/Remote-greenhouse-monitor/blob/main/img/5.png)

#### Moderate/Transitional Crops (Flexible 12-24°C)

![monitor_image4](https://github.com/benb0jangles/Remote-greenhouse-monitor/blob/main/img/4.jpg)

### Practical Use Cases with Your Data

#### Example 1: Planning Tomato Growing Season
Look at your historical data:
1. **When does temperature reliably stay above 15°C at night?** → Safe to transplant
2. **When does light exceed 40,000 lux consistently?** → Good fruit set
3. **Does summer humidity stay below 75%?** → Blossom end rot prevention
4. **Soil moisture patterns** → How often to water (target 65-75%)

#### Example 2: Optimizing Year-Round Production
Analyze your annual patterns:
- **December-February** (low light): Microgreens, hardy salads (with grow lights)
- **March-April** (warming up): Start transplants, cool-season crops
- **May-September** (peak season): Warm-season fruiting crops
- **October-November** (cooling down): Second crop of cool-season vegetables

### Warning Thresholds to Monitor

Set up alerts for:
- **Temperature < 2°C**: Frost warning (protect crops or add heat)
- **Temperature > 32°C**: Heat stress (increase ventilation, shade)
- **Humidity > 85%** for 6+ hours: Disease risk (improve air circulation)
- **Soil moisture < 45%**: Irrigation needed
- **Soil moisture > 85%**: Drainage issue (reduce watering)
- **Light < 15,000 lux** average in growing season: Consider supplemental lighting
  
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
