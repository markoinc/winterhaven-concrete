#!/usr/bin/env node
/**
 * Generate location pages for Winter Haven Concrete Contractors
 * Creates unique pages for cities/towns/CDPs within 1 hour drive
 */

const fs = require('fs');
const path = require('path');

// All locations within ~60 miles / 1 hour drive of Winter Haven
const locations = [
  // ============================================
  // POLK COUNTY - Full Coverage
  // ============================================
  // Major Cities
  { name: 'Bartow', slug: 'bartow', county: 'Polk', distance: '12 miles', type: 'city', 
    desc: 'the county seat of Polk County', landmarks: ['Polk County Courthouse', 'Downtown Bartow Historic District', 'Wonderhouse'] },
  { name: 'Davenport', slug: 'davenport', county: 'Polk', distance: '18 miles', type: 'city',
    desc: 'a gateway city near Disney attractions', landmarks: ['ChampionsGate Golf Club', 'Northeast Regional Park', 'Providence Golf Club'] },
  { name: 'Polk City', slug: 'polk-city', county: 'Polk', distance: '20 miles', type: 'town',
    desc: 'a charming lakeside community', landmarks: ['Fantasy of Flight', 'Lake Agnes', 'Polk City Park'] },
  { name: 'Lake Alfred', slug: 'lake-alfred', county: 'Polk', distance: '8 miles', type: 'city',
    desc: 'known for its beautiful chain of lakes', landmarks: ['Lake Alfred', 'Mackay Gardens', 'Downtown Lake Alfred'] },
  { name: 'Dundee', slug: 'dundee', county: 'Polk', distance: '10 miles', type: 'town',
    desc: 'a historic citrus town', landmarks: ['Lake Marie', 'Dundee Depot', 'Downtown Dundee'] },
  { name: 'Eagle Lake', slug: 'eagle-lake', county: 'Polk', distance: '5 miles', type: 'city',
    desc: 'a growing community just south of Winter Haven', landmarks: ['Eagle Lake Park', 'Lake Eloise', 'Eagle Lake Community Center'] },
  { name: 'Fort Meade', slug: 'fort-meade', county: 'Polk', distance: '18 miles', type: 'city',
    desc: 'a historic Peace River community', landmarks: ['Fort Meade Historical Museum', 'Peace River', 'Downtown Fort Meade'] },
  { name: 'Mulberry', slug: 'mulberry', county: 'Polk', distance: '16 miles', type: 'city',
    desc: 'the phosphate mining capital of the world', landmarks: ['Mulberry Phosphate Museum', 'Alafia River State Park nearby', 'Downtown Mulberry'] },
  { name: 'Frostproof', slug: 'frostproof', county: 'Polk', distance: '22 miles', type: 'city',
    desc: 'nestled along the Lake Wales Ridge', landmarks: ['Lake Reedy', 'Ramon Theater', 'Downtown Frostproof'] },
  { name: 'Lake Hamilton', slug: 'lake-hamilton', county: 'Polk', distance: '6 miles', type: 'town',
    desc: 'a scenic lakeside community', landmarks: ['Lake Hamilton', 'Lake Hamilton Park', 'Highway 27 corridor'] },
  { name: 'Highland Park', slug: 'highland-park', county: 'Polk', distance: '15 miles', type: 'village',
    desc: 'a quiet residential community near Lake Wales', landmarks: ['Lake Wales Ridge', 'Citrus groves', 'Scenic Highway 17'] },
  
  // Polk County CDPs
  { name: 'Highland City', slug: 'highland-city', county: 'Polk', distance: '12 miles', type: 'CDP',
    desc: 'a growing suburb between Lakeland and Bartow', landmarks: ['Saddle Creek Park', 'Lakeland Linder Airport nearby', 'US 98 corridor'] },
  { name: 'Kathleen', slug: 'kathleen', county: 'Polk', distance: '18 miles', type: 'CDP',
    desc: 'a northern Polk County community near Lakeland', landmarks: ['Kathleen High School', 'Lake Gibson', 'North Lakeland area'] },
  { name: 'Combee Settlement', slug: 'combee-settlement', county: 'Polk', distance: '10 miles', type: 'CDP',
    desc: 'a residential community east of Lakeland', landmarks: ['Combee Road corridor', 'Lake Bonny', 'Eastside Lakeland area'] },
  { name: 'Cypress Gardens', slug: 'cypress-gardens', county: 'Polk', distance: '3 miles', type: 'CDP',
    desc: 'the historic home of Florida\'s first theme park', landmarks: ['LEGOLAND Florida', 'Lake Eloise', 'Historic Cypress Gardens area'] },
  { name: 'Lakeland Highlands', slug: 'lakeland-highlands', county: 'Polk', distance: '14 miles', type: 'CDP',
    desc: 'a prestigious residential area south of Lakeland', landmarks: ['Lakeland Highlands Scrub', 'South Lakeland area', 'Highlands Road corridor'] },
  { name: 'Jan Phyl Village', slug: 'jan-phyl-village', county: 'Polk', distance: '5 miles', type: 'CDP',
    desc: 'a residential community west of Winter Haven', landmarks: ['Lake Shipp', 'Recker Highway', 'West Winter Haven area'] },
  { name: 'Crooked Lake Park', slug: 'crooked-lake-park', county: 'Polk', distance: '18 miles', type: 'CDP',
    desc: 'a scenic lakeside community near Frostproof', landmarks: ['Crooked Lake', 'Lake Wales Ridge', 'Crooked Lake Prairie'] },
  { name: 'Inwood', slug: 'inwood', county: 'Polk', distance: '4 miles', type: 'CDP',
    desc: 'a central Winter Haven area community', landmarks: ['Inwood neighborhood', 'Lake Howard', 'Downtown Winter Haven nearby'] },
  { name: 'Crystal Lake', slug: 'crystal-lake', county: 'Polk', distance: '14 miles', type: 'CDP',
    desc: 'a lakeside community between Lakeland and Bartow', landmarks: ['Crystal Lake', 'US 98 corridor', 'Central Polk County'] },
  { name: 'Medulla', slug: 'medulla', county: 'Polk', distance: '16 miles', type: 'CDP',
    desc: 'a rural community south of Lakeland', landmarks: ['Medulla Road', 'Lakeland Linder Airport', 'South Lakeland area'] },
  { name: 'Willow Oak', slug: 'willow-oak', county: 'Polk', distance: '14 miles', type: 'CDP',
    desc: 'a residential area southwest of Lakeland', landmarks: ['Imperial Lakes', 'South Lakeland', 'Willow Oak subdivision'] },
  { name: 'Fuller Heights', slug: 'fuller-heights', county: 'Polk', distance: '12 miles', type: 'CDP',
    desc: 'a growing residential community near Lakeland', landmarks: ['Fuller Heights area', 'Lakeland suburbs', 'Highway 98 corridor'] },
  { name: 'Babson Park', slug: 'babson-park', county: 'Polk', distance: '20 miles', type: 'CDP',
    desc: 'home to Webber International University', landmarks: ['Webber International University', 'Crooked Lake', 'Lake Wales Ridge'] },
  { name: 'Alturas', slug: 'alturas', county: 'Polk', distance: '16 miles', type: 'CDP',
    desc: 'a rural community in eastern Polk County', landmarks: ['Alturas Road', 'Lake Weohyakapka nearby', 'Rural Polk County'] },
  { name: 'Wahneta', slug: 'wahneta', county: 'Polk', distance: '8 miles', type: 'CDP',
    desc: 'a residential community east of Winter Haven', landmarks: ['Wahneta area', 'Lake Weohyakapka nearby', 'East Winter Haven'] },
  { name: 'Waverly', slug: 'waverly', county: 'Polk', distance: '6 miles', type: 'CDP',
    desc: 'a community along the Lake Wales Ridge', landmarks: ['Waverly Road', 'Lake Wales Ridge', 'Between Winter Haven and Lake Wales'] },
  { name: 'Loughman', slug: 'loughman', county: 'Polk', distance: '20 miles', type: 'CDP',
    desc: 'a fast-growing community near Disney', landmarks: ['Posner Park', 'US 27 corridor', 'Reunion Resort nearby'] },
  { name: 'Grenelefe', slug: 'grenelefe', county: 'Polk', distance: '14 miles', type: 'CDP',
    desc: 'a golf resort community', landmarks: ['Grenelefe Golf & Tennis Resort', 'Lake Marion', 'Haines City area'] },
  { name: 'Four Corners', slug: 'four-corners', county: 'Polk', distance: '22 miles', type: 'CDP',
    desc: 'where four Florida counties meet', landmarks: ['Four Corners intersection', 'US 192 corridor', 'Near Disney attractions'] },
  { name: 'Fussels Corner', slug: 'fussels-corner', county: 'Polk', distance: '9 miles', type: 'CDP',
    desc: 'a residential community near Lakeland', landmarks: ['Fussels Corner Road', 'Lakeland area', 'Central Polk County'] },
  { name: 'Eaton Park', slug: 'eaton-park', county: 'Polk', distance: '8 miles', type: 'CDP',
    desc: 'a growing community between Lakeland and Winter Haven', landmarks: ['Eaton Park area', 'Highway 92 corridor', 'Central Polk County'] },
  { name: 'Hillcrest Heights', slug: 'hillcrest-heights', county: 'Polk', distance: '10 miles', type: 'CDP',
    desc: 'an elevated residential community', landmarks: ['Hillcrest Heights neighborhood', 'Lake Wales Ridge', 'Scenic views'] },
  { name: 'Homeland', slug: 'homeland', county: 'Polk', distance: '16 miles', type: 'unincorporated',
    desc: 'a rural community in southern Polk County', landmarks: ['Homeland Heritage Park', 'Homeland area', 'Rural Polk County'] },
  { name: 'Bradley Junction', slug: 'bradley-junction', county: 'Polk', distance: '14 miles', type: 'unincorporated',
    desc: 'a historic railroad junction community', landmarks: ['CSX railway', 'Bradley Junction area', 'East Polk County'] },
  { name: 'Winston', slug: 'winston', county: 'Polk', distance: '10 miles', type: 'CDP',
    desc: 'a small community in central Polk County', landmarks: ['Winston area', 'Lake Winterset', 'Central Winter Haven area'] },
  { name: 'Gibsonia', slug: 'gibsonia', county: 'Polk', distance: '18 miles', type: 'unincorporated',
    desc: 'a community near Mulberry', landmarks: ['Gibsonia area', 'Mulberry vicinity', 'Phosphate country'] },
  { name: 'Socrum', slug: 'socrum', county: 'Polk', distance: '20 miles', type: 'unincorporated',
    desc: 'a community in northwest Polk County', landmarks: ['Socrum Loop Road', 'Lake Gibson area', 'North Lakeland'] },

  // ============================================
  // OSCEOLA COUNTY - Within 1 Hour
  // ============================================
  { name: 'Kissimmee', slug: 'kissimmee', county: 'Osceola', distance: '28 miles', type: 'city',
    desc: 'the Gateway to Walt Disney World', landmarks: ['Old Town Kissimmee', 'Lake Tohopekaliga', 'Downtown Kissimmee'] },
  { name: 'St. Cloud', slug: 'st-cloud', county: 'Osceola', distance: '32 miles', type: 'city',
    desc: 'a historic lakeside community', landmarks: ['Lake Tohopekaliga', 'Downtown St. Cloud', 'St. Cloud Heritage Museum'] },
  { name: 'Poinciana', slug: 'poinciana', county: 'Osceola', distance: '18 miles', type: 'CDP',
    desc: 'a rapidly growing community spanning Osceola and Polk counties', landmarks: ['Poinciana Community Park', 'Vance Harmon Park', 'Pleasant Hill Road corridor'] },
  { name: 'Celebration', slug: 'celebration', county: 'Osceola', distance: '30 miles', type: 'CDP',
    desc: 'a master-planned community by Disney', landmarks: ['Celebration Town Center', 'Celebration Golf Club', 'Disney-designed architecture'] },
  { name: 'Buenaventura Lakes', slug: 'buenaventura-lakes', county: 'Osceola', distance: '30 miles', type: 'CDP',
    desc: 'a residential community near Kissimmee', landmarks: ['Buena Ventura Lakes', 'John Young Parkway', 'BVL amenities'] },
  { name: 'Campbell', slug: 'campbell', county: 'Osceola', distance: '25 miles', type: 'CDP',
    desc: 'a small community in Osceola County', landmarks: ['Campbell area', 'US 17-92 corridor', 'Osceola County'] },
  { name: 'Champions Gate', slug: 'champions-gate', county: 'Osceola', distance: '24 miles', type: 'CDP',
    desc: 'a premier golf resort community', landmarks: ['ChampionsGate Golf Resort', 'Omni Orlando Resort', 'I-4 corridor'] },
  { name: 'Harmony', slug: 'harmony', county: 'Osceola', distance: '38 miles', type: 'CDP',
    desc: 'an eco-friendly planned community', landmarks: ['Harmony Town Center', 'Buck Lake', 'Harmony Golf Preserve'] },
  { name: 'Intercession City', slug: 'intercession-city', county: 'Osceola', distance: '20 miles', type: 'unincorporated',
    desc: 'a historic community along US 17-92', landmarks: ['Intercession City area', 'US 17-92 corridor', 'Lake County line'] },

  // ============================================
  // HIGHLANDS COUNTY - Within 1 Hour
  // ============================================
  { name: 'Sebring', slug: 'sebring', county: 'Highlands', distance: '35 miles', type: 'city',
    desc: 'home of the famous 12 Hours of Sebring race', landmarks: ['Sebring International Raceway', 'Downtown Sebring Circle', 'Highlands Hammock State Park'] },
  { name: 'Avon Park', slug: 'avon-park', county: 'Highlands', distance: '30 miles', type: 'city',
    desc: 'one of Florida\'s oldest inland cities', landmarks: ['Historic Downtown Avon Park', 'Hotel Jacaranda', 'Lake Verona'] },
  { name: 'Lake Placid', slug: 'lake-placid', county: 'Highlands', distance: '42 miles', type: 'town',
    desc: 'the Caladium Capital of the World', landmarks: ['Lake Placid Murals', 'Caladium Fields', 'Downtown Lake Placid'] },
  { name: 'Lorida', slug: 'lorida', county: 'Highlands', distance: '45 miles', type: 'unincorporated',
    desc: 'a rural ranching community', landmarks: ['Lorida area', 'Lake Istokpoga nearby', 'Highlands County ranches'] },
  { name: 'Venus', slug: 'venus', county: 'Highlands', distance: '48 miles', type: 'unincorporated',
    desc: 'a small community in southern Highlands County', landmarks: ['Venus area', 'Archbold Biological Station nearby', 'Lake Wales Ridge'] },

  // ============================================
  // HILLSBOROUGH COUNTY - Within 1 Hour
  // ============================================
  { name: 'Plant City', slug: 'plant-city', county: 'Hillsborough', distance: '32 miles', type: 'city',
    desc: 'the Winter Strawberry Capital of the World', landmarks: ['Florida Strawberry Festival', 'Downtown Plant City', 'Dinosaur World'] },
  { name: 'Brandon', slug: 'brandon', county: 'Hillsborough', distance: '38 miles', type: 'CDP',
    desc: 'a major Tampa suburb', landmarks: ['Westfield Brandon Mall', 'Brandon Town Center', 'Providence Road corridor'] },
  { name: 'Riverview', slug: 'riverview', county: 'Hillsborough', distance: '42 miles', type: 'CDP',
    desc: 'one of Tampa Bay\'s fastest-growing communities', landmarks: ['Alafia River', 'Riverview Town Center', 'US 301 corridor'] },
  { name: 'Valrico', slug: 'valrico', county: 'Hillsborough', distance: '36 miles', type: 'CDP',
    desc: 'a family-friendly Tampa suburb', landmarks: ['Valrico area', 'Bloomingdale', 'SR 60 corridor'] },
  { name: 'Dover', slug: 'dover', county: 'Hillsborough', distance: '35 miles', type: 'CDP',
    desc: 'a community along the Plant City corridor', landmarks: ['Dover area', 'I-4 corridor', 'Hillsborough River nearby'] },
  { name: 'Sydney', slug: 'sydney', county: 'Hillsborough', distance: '34 miles', type: 'CDP',
    desc: 'a small community between Plant City and Brandon', landmarks: ['Sydney area', 'Sydney Road', 'East Hillsborough'] },

  // ============================================
  // LAKE COUNTY - Within 1 Hour
  // ============================================
  { name: 'Clermont', slug: 'clermont', county: 'Lake', distance: '35 miles', type: 'city',
    desc: 'the Choice of Champions in the hills of Lake County', landmarks: ['Lake Minneola', 'National Training Center', 'Historic Downtown Clermont'] },
  { name: 'Minneola', slug: 'minneola', county: 'Lake', distance: '38 miles', type: 'city',
    desc: 'a growing lakeside community', landmarks: ['Lake Minneola', 'South Lake Trail', 'Minneola Athletic Complex'] },
  { name: 'Groveland', slug: 'groveland', county: 'Lake', distance: '32 miles', type: 'city',
    desc: 'a historic citrus community', landmarks: ['Lake David', 'Cherry Lake', 'Historic Downtown Groveland'] },
  { name: 'Mascotte', slug: 'mascotte', county: 'Lake', distance: '30 miles', type: 'city',
    desc: 'a small Lake County community', landmarks: ['Lake Mascotte', 'Downtown Mascotte', 'SR 50 corridor'] },
  { name: 'Leesburg', slug: 'leesburg', county: 'Lake', distance: '45 miles', type: 'city',
    desc: 'the Lakefront City', landmarks: ['Lake Harris', 'Downtown Leesburg', 'Venetian Gardens'] },

  // ============================================
  // HARDEE COUNTY - Within 1 Hour
  // ============================================
  { name: 'Wauchula', slug: 'wauchula', county: 'Hardee', distance: '35 miles', type: 'city',
    desc: 'the county seat of Hardee County', landmarks: ['Peace River', 'Downtown Wauchula', 'Hardee County Courthouse'] },
  { name: 'Bowling Green', slug: 'bowling-green', county: 'Hardee', distance: '28 miles', type: 'city',
    desc: 'a small community in Hardee County', landmarks: ['Paynes Creek Historic State Park', 'Peace River', 'Downtown Bowling Green'] },
  { name: 'Zolfo Springs', slug: 'zolfo-springs', county: 'Hardee', distance: '32 miles', type: 'town',
    desc: 'a historic Peace River community', landmarks: ['Pioneer Park', 'Zolfo Springs', 'Peace River corridor'] },

  // ============================================
  // ORANGE COUNTY - Within 1 Hour (edges)
  // ============================================
  { name: 'Orlando', slug: 'orlando', county: 'Orange', distance: '50 miles', type: 'city',
    desc: 'the Theme Park Capital of the World', landmarks: ['Walt Disney World', 'Universal Studios', 'Downtown Orlando'] },
  { name: 'Windermere', slug: 'windermere', county: 'Orange', distance: '40 miles', type: 'town',
    desc: 'an upscale lakeside community', landmarks: ['Butler Chain of Lakes', 'Windermere Town Center', 'Isleworth Golf'] },

  // ============================================
  // PASCO COUNTY - Within 1 Hour (edges)
  // ============================================
  { name: 'Zephyrhills', slug: 'zephyrhills', county: 'Pasco', distance: '40 miles', type: 'city',
    desc: 'famous for its natural spring water', landmarks: ['Zephyrhills Bottling Plant', 'Downtown Zephyrhills', 'Crystal Springs'] },
  { name: 'Dade City', slug: 'dade-city', county: 'Pasco', distance: '45 miles', type: 'city',
    desc: 'a charming antique destination', landmarks: ['Downtown Dade City', 'Pioneer Florida Museum', 'Antique District'] },
];

// Template for location page
function generateLocationPage(loc) {
  const slug = loc.slug;
  const city = loc.name;
  const county = loc.county;
  const distance = loc.distance;
  const desc = loc.desc;
  const landmarks = loc.landmarks || [];

  return `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import ContactForm from '../../components/ContactForm.astro';

const city = '${city}';
const county = '${county}';
const state = 'FL';
const distance = '${distance}';

const services = [
  { name: 'Concrete Driveways', href: '/services/driveways' },
  { name: 'Concrete Patios', href: '/services/patios' },
  { name: 'Concrete Slabs', href: '/services/slabs' },
  { name: 'Stamped Concrete', href: '/services/stamped-concrete' },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": \`Concrete Contractors in \${city}, \${state}\`,
  "provider": {
    "@type": "LocalBusiness",
    "name": "Winter Haven Concrete Contractors",
    "telephone": "(863) 396-6145"
  },
  "areaServed": {
    "@type": "City",
    "name": city,
    "containedInPlace": {
      "@type": "State",
      "name": "Florida"
    }
  },
  "description": \`Professional concrete contractors serving \${city}, \${state}. Driveways, patios, slabs, and stamped concrete.\`
};
---

<BaseLayout 
  title={\`Concrete Contractors \${city} FL | Driveways, Patios & Slabs\`}
  description={\`Professional concrete contractors in \${city}, Florida. Expert driveways, patios, slabs & stamped concrete. \${distance} from Winter Haven. Free estimates. Call (863) 396-6145.\`}
  canonical="/locations/${slug}"
  schema={schema}
>
  <!-- Hero -->
  <section class="bg-gradient-to-br from-slate-900 to-slate-800 py-16 lg:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="text-white">
          <nav class="text-sm text-gray-400 mb-4">
            <a href="/" class="hover:text-primary-400">Home</a>
            <span class="mx-2">›</span>
            <a href="/locations" class="hover:text-primary-400">Locations</a>
            <span class="mx-2">›</span>
            <span class="text-gray-300">{city}</span>
          </nav>
          <h1 class="text-4xl sm:text-5xl font-bold mb-6">Concrete Contractors in {city}, {state}</h1>
          <p class="text-xl text-gray-300 mb-4">
            Professional concrete services for {city} homes and businesses. Located just {distance} from our Winter Haven headquarters, we proudly serve ${desc}.
          </p>
          <p class="text-gray-400 mb-8">
            From new driveways to decorative stamped concrete patios, our experienced team delivers quality workmanship throughout {county} County.
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="tel:+18633966145" class="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-all">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              (863) 396-6145
            </a>
            <a href="/contact" class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg border border-white/20 transition-all">
              Get Free Quote
            </a>
          </div>
        </div>
        <div>
          <ContactForm variant="dark" title={\`Free Quote in \${city}\`} />
        </div>
      </div>
    </div>
  </section>

  <!-- Services -->
  <section class="py-16 lg:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Our Concrete Services in {city}</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map(service => (
          <a href={service.href} class="group bg-white border border-gray-200 p-6 rounded-xl hover:border-primary-500 hover:shadow-lg transition-all text-center">
            <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500 transition-colors">
              <svg class="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{service.name}</h3>
          </a>
        ))}
      </div>
    </div>
  </section>

  <!-- Local Area Info -->
  <section class="py-16 lg:py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Serving {city} & {county} County</h2>
          <div class="space-y-4 text-gray-600">
            <p>
              {city} is ${desc}. Our team has extensive experience working throughout the area, understanding local soil conditions, building codes, and the unique needs of {county} County residents.
            </p>
            <p>
              Whether you're near ${landmarks.length > 0 ? landmarks.join(', ') : 'the heart of ' + city}, we bring the same professional service and quality materials to every project.
            </p>
            <p>
              Just {distance} from our Winter Haven location, we can quickly respond to your concrete needs with free on-site estimates and competitive pricing.
            </p>
          </div>
          <div class="mt-8 flex flex-wrap gap-4">
            <a href="/contact" class="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-all">
              Request Free Estimate
            </a>
            <a href="/locations" class="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold py-3 px-6 transition-all">
              View All Service Areas →
            </a>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-8 shadow-lg">
          <h3 class="font-bold text-gray-900 mb-4">Why Choose Us for Your {city} Project?</h3>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              <span class="text-gray-600">Local team that knows {county} County</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              <span class="text-gray-600">Free estimates with no obligation</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              <span class="text-gray-600">Licensed & insured in Florida</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              <span class="text-gray-600">Quality materials & expert installation</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              <span class="text-gray-600">Only {distance} away — fast response times</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-16 lg:py-20 bg-primary-500">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-bold text-white mb-6">Ready to Start Your {city} Concrete Project?</h2>
      <p class="text-xl text-primary-100 mb-8">
        Contact us today for a free, no-obligation estimate on driveways, patios, slabs, or stamped concrete.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="tel:+18633966145" class="inline-flex items-center justify-center gap-2 bg-white text-primary-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          Call (863) 396-6145
        </a>
        <a href="/contact" class="inline-flex items-center justify-center gap-2 bg-primary-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-primary-700 border-2 border-white/20 transition-all">
          Get Online Quote
        </a>
      </div>
    </div>
  </section>
</BaseLayout>
`;
}

// Generate all location pages
const locationsDir = path.join(__dirname, '../src/pages/locations');

// Ensure directory exists
if (!fs.existsSync(locationsDir)) {
  fs.mkdirSync(locationsDir, { recursive: true });
}

// Skip existing files (winter-haven, lakeland, auburndale, haines-city, lake-wales)
const skipSlugs = ['winter-haven', 'lakeland', 'auburndale', 'haines-city', 'lake-wales', 'index'];

let created = 0;
let skipped = 0;

locations.forEach(loc => {
  const filePath = path.join(locationsDir, `${loc.slug}.astro`);
  
  if (skipSlugs.includes(loc.slug)) {
    console.log(`Skipping existing: ${loc.slug}`);
    skipped++;
    return;
  }
  
  const content = generateLocationPage(loc);
  fs.writeFileSync(filePath, content);
  console.log(`Created: ${loc.slug}.astro`);
  created++;
});

console.log(`\n✅ Created ${created} location pages`);
console.log(`⏭️  Skipped ${skipped} existing pages`);
console.log(`📊 Total locations in service area: ${locations.length + 5}`); // +5 for existing pages

// Output locations data for index page update
const allLocations = [
  { name: 'Winter Haven', slug: 'winter-haven', county: 'Polk County' },
  { name: 'Lakeland', slug: 'lakeland', county: 'Polk County' },
  { name: 'Auburndale', slug: 'auburndale', county: 'Polk County' },
  { name: 'Haines City', slug: 'haines-city', county: 'Polk County' },
  { name: 'Lake Wales', slug: 'lake-wales', county: 'Polk County' },
  ...locations.map(l => ({ name: l.name, slug: l.slug, county: `${l.county} County` }))
];

// Write locations data to JSON for easy updating of index
fs.writeFileSync(
  path.join(__dirname, '../src/data/locations.json'),
  JSON.stringify(allLocations.sort((a, b) => a.name.localeCompare(b.name)), null, 2)
);

console.log(`\n📁 Wrote locations.json with ${allLocations.length} total locations`);
