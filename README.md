# StormHacks2025

# False Creek Species Revival — Interactive Visualization with AI Dialogue

**Project Overview**  
When the Sea Remembered... is an interactive web application that digitally “restores” marine and coastal species that were once abundant in Vancouver's False Creek / Burrard Inlet but have since declined or disappeared due to human activities. Users can explore historical ecology, understand human impacts, and interact with AI-generated dialogues via **Gemini API**.

---

## 🌿 Project Goals
- Visualize historical vs. current ecological conditions of False Creek  
- Provide educational content about marine and coastal biodiversity  
- Use interactive animations to simulate species disappearance, habitat degradation, and potential restoration  
- Enable AI-generated dialogues using **Gemini API**, allowing users to ask questions about species or habitats  
- Display geographical context using **Google Maps API**  

---

## 🐟 Target Species & Interactive Design Suggestions

| Species / Category | Historical Presence | Current Status / Reasons for Decline | Suggested Interactive Visualization |
|-------------------|------------------|-------------------------------------|-----------------------------------|
| Pacific Herring | Once abundant, spawning beds associated with eelgrass | Decline due to eelgrass loss, pollution, substrate disturbance | Hover to reveal herring spawning beds + historical eelgrass layer; ask AI “What did herring eat?” |
| Smelt | Documented in historical fishing records | Scarce or locally extinct due to water quality degradation | Show dense historical smelt schools vs. sparse modern waters |
| Flatfish / Benthic Fish | Listed in early catch records | Sensitive to substrate pollution | Display sediment cross-section showing lost habitats |
| Bivalves / Mollusks | Olympia oysters, butter clams, littleneck clams, mussels | Declined from harvesting, pollution, ocean acidification | Shell textures with fading/disappearing animation |
| Eelgrass | Provided shelter for fish and invertebrates | Loss from low light, turbidity, sediment accumulation | Background layer gradually fades or erodes |
| Worms / Other Benthic Invertebrates | Recorded in benthic surveys | Affected by pollution and habitat loss | Tiny animated organisms that fade on hover |
| Birds / Waterfowl | Frequented wetlands and intertidal zones | Wetlands filled or polluted, bird activity reduced | Display historical bird presence along shoreline on hover |
| Harbour Seals | Occasionally still seen | Lower numbers and frequency than historical | Compare “historical abundance vs. modern scarcity” animation |
| North Pacific Spiny Dogfish | Recorded as a threatened species | Marginalized by fishing and water quality | Click to show historical vs. current habitat range |
| Other Fish / Salmon / Sturgeon / Groundfish / Whales | Historically abundant | Modern populations much lower | Interactive list comparing historical and modern species |
| Palio zosterae (Sea Slugs) | Recorded in BC coastal areas | Rare or sensitive species | Showcase as representative small invertebrate |

> ⚠️ Note: Over 99% of the intertidal False Creek Flats have been filled, causing permanent loss of habitat for many intertidal and benthic species.

---

## 💡 Design & Interactive Features
- Background layers (eelgrass, intertidal zones) with fade/erosion animation  
- Hover/click interactions to show historical vs. modern species and habitats  
- Animated benthic organisms fading on hover  
- **Gemini API** integration: AI-generated dialogues with virtual species guides  
- **Google Maps API** integration: visualize species habitats and ecological data geographically  
- Layering and transparency simulate species disappearance and habitat loss  

---

## 💻 Tech Stack
- **Frontend:** React.js, HTML, CSS, SVG/Canvas for interactive animations  
- **Backend / Server:** Node.js, Express  
- **AI Integration:** Gemini API for natural language responses  
- **Maps / Geolocation:** Google Maps API  
- **Data:** Historical ecology research, catch records, survey CSV/JSON  
- **Deployment:** Netlify / Vercel / Static server  

 
## 👩‍💻 Contributors

- **Leen** – Frontend Development (React, Interactive Animations)
- **Veronica** – SVG asset creation, UI/UX Design (Figma, layout, interactive visuals)
- **Hyelim** – Backend Development (Node.js, Express, API routing, server setup), Database integration, Server-side logic, API endpoints   
- **Qian** – Gemini API troubleshooting and integration, AI dialogue system, Documentation, Testing and debugging  


## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/false-creek-planet.git
   cd false-creek-planet

