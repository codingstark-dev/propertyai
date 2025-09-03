import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Search, MapPin, Calendar, Users, Building2, Star } from 'lucide-react-native';

interface VillaCategory {
  id: string;
  name: string;
  description: string;
  bedrooms: string;
  guests: string;
  amenities: string[];
  priceRange: string;
}

export default function VillasScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('villas');

  const villaCategories: VillaCategory[] = [
    {
      id: '1',
      name: 'Beachfront Villas',
      description: 'Exclusive oceanfront properties with private beaches',
      bedrooms: '4-12 bedrooms',
      guests: '8-24 guests',
      amenities: ['Private Beach', 'Pool', 'Chef', 'Spa'],
      priceRange: 'From $5,000/night',
    },
    {
      id: '2',
      name: 'Mountain Retreats',
      description: 'Luxury chalets and lodges in pristine locations',
      bedrooms: '5-10 bedrooms',
      guests: '10-20 guests',
      amenities: ['Mountain Views', 'Hot Tub', 'Fireplace', 'Ski Access'],
      priceRange: 'From $3,500/night',
    },
    {
      id: '3',
      name: 'City Penthouses',
      description: 'Sophisticated urban properties with skyline views',
      bedrooms: '3-8 bedrooms',
      guests: '6-16 guests',
      amenities: ['City Views', 'Rooftop', 'Concierge', 'Gym'],
      priceRange: 'From $2,800/night',
    },
    {
      id: '4',
      name: 'Historic Estates',
      description: 'Restored castles and manor houses with rich heritage',
      bedrooms: '6-20 bedrooms',
      guests: '12-40 guests',
      amenities: ['Gardens', 'Wine Cellar', 'Great Hall', 'History'],
      priceRange: 'From $4,200/night',
    },
  ];

  const eventTypes = [
    { name: 'Weddings', description: 'Destination weddings in paradise', icon: '💒' },
    { name: 'Corporate Retreats', description: 'Executive team building experiences', icon: '🏢' },
    { name: 'Milestone Celebrations', description: 'Birthdays, anniversaries, graduations', icon: '🎉' },
    { name: 'Fashion Shows', description: 'Luxury runway events and photoshoots', icon: '👗' },
    { name: 'Product Launches', description: 'Exclusive brand unveilings', icon: '🚀' },
    { name: 'Private Parties', description: 'Intimate gatherings and soirées', icon: '🥂' },
  ];

  const destinations = ['Maldives', 'Tuscany', 'Aspen', 'Hamptons', 'St. Barts', 'Santorini'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Villas & Events</Text>
        <Text style={styles.headerSubtitle}>Luxury properties and exclusive experiences</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'villas' && styles.activeTab]}
          onPress={() => setActiveTab('villas')}
        >
          <Text style={[styles.tabText, activeTab === 'villas' && styles.activeTabText]}>
            Luxury Villas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'events' && styles.activeTab]}
          onPress={() => setActiveTab('events')}
        >
          <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>
            Exclusive Events
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#888888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder={activeTab === 'villas' ? 'Search villas, destinations...' : 'Search event venues, services...'}
              placeholderTextColor="#888888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.quickFilters}>
            <TouchableOpacity style={styles.filterButton} onPress={() => console.log('Location filter pressed')}>
              <MapPin size={16} color="#D4AF37" />
              <Text style={styles.filterButtonText}>Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton} onPress={() => console.log('Dates filter pressed')}>
              <Calendar size={16} color="#D4AF37" />
              <Text style={styles.filterButtonText}>Dates</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton} onPress={() => console.log('Guests filter pressed')}>
              <Users size={16} color="#D4AF37" />
              <Text style={styles.filterButtonText}>Guests</Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeTab === 'villas' ? (
          <>
            <View style={styles.destinationsSection}>
              <Text style={styles.sectionTitle}>Popular Destinations</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {destinations.map((destination, index) => (
                  <TouchableOpacity key={index} style={styles.destinationCard} onPress={() => console.log(`Villa destination selected: ${destination}`)}>
                    <Text style={styles.destinationText}>{destination}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.categoriesSection}>
              <Text style={styles.sectionTitle}>Villa Categories</Text>
              
              {villaCategories.map((category) => (
                <TouchableOpacity key={category.id} style={styles.categoryCard} onPress={() => console.log(`Villa category selected: ${category.name}`)}>
                  <View style={styles.categoryHeader}>
                    <Building2 size={24} color="#D4AF37" />
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </View>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                  
                  <View style={styles.categorySpecs}>
                    <View style={styles.specItem}>
                      <Text style={styles.specLabel}>Bedrooms</Text>
                      <Text style={styles.specValue}>{category.bedrooms}</Text>
                    </View>
                    <View style={styles.specItem}>
                      <Text style={styles.specLabel}>Capacity</Text>
                      <Text style={styles.specValue}>{category.guests}</Text>
                    </View>
                  </View>

                  <View style={styles.amenitiesContainer}>
                    <Text style={styles.amenitiesLabel}>Featured Amenities:</Text>
                    <View style={styles.amenitiesTags}>
                      {category.amenities.map((amenity, index) => (
                        <View key={index} style={styles.amenityTag}>
                          <Text style={styles.amenityTagText}>{amenity}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.categoryFooter}>
                    <Text style={styles.categoryPrice}>{category.priceRange}</Text>
                    <TouchableOpacity style={styles.viewButton} onPress={() => console.log(`View properties for: ${category.name}`)}>
                      <Text style={styles.viewButtonText}>View Properties</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.eventsSection}>
            <Text style={styles.sectionTitle}>Event Planning Services</Text>
            
            <View style={styles.eventsGrid}>
              {eventTypes.map((event, index) => (
                <TouchableOpacity key={index} style={styles.eventCard} onPress={() => console.log(`Event card pressed: ${event.name}`)}>
                  <Text style={styles.eventIcon}>{event.icon}</Text>
                  <Text style={styles.eventName}>{event.name}</Text>
                  <Text style={styles.eventDescription}>{event.description}</Text>
                  <View style={styles.eventFooter}>
                    <TouchableOpacity style={styles.eventButton} onPress={() => console.log(`Plan event pressed: ${event.name}`)}>
                      <Text style={styles.eventButtonText}>Plan Event</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.eventServicesSection}>
              <Text style={styles.sectionTitle}>Event Services</Text>
              <View style={styles.servicesList}>
                <View style={styles.serviceItem}>
                  <Star size={20} color="#D4AF37" />
                  <View style={styles.serviceContent}>
                    <Text style={styles.serviceTitle}>Full Event Production</Text>
                    <Text style={styles.serviceDescription}>Complete planning, design, and execution services</Text>
                  </View>
                </View>
                <View style={styles.serviceItem}>
                  <Star size={20} color="#D4AF37" />
                  <View style={styles.serviceContent}>
                    <Text style={styles.serviceTitle}>Catering & Hospitality</Text>
                    <Text style={styles.serviceDescription}>Michelin-star chefs and premium beverage programs</Text>
                  </View>
                </View>
                <View style={styles.serviceItem}>
                  <Star size={20} color="#D4AF37" />
                  <View style={styles.serviceContent}>
                    <Text style={styles.serviceTitle}>Entertainment</Text>
                    <Text style={styles.serviceDescription}>Celebrity performers, DJs, and live music acts</Text>
                  </View>
                </View>
                <View style={styles.serviceItem}>
                  <Star size={20} color="#D4AF37" />
                  <View style={styles.serviceContent}>
                    <Text style={styles.serviceTitle}>Transportation</Text>
                    <Text style={styles.serviceDescription}>Luxury transfers and guest transportation coordination</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#000000',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '500',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#000000',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  searchSection: {
    padding: 20,
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E4E2',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  quickFilters: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E4E2',
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  filterButtonText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  destinationsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  destinationCard: {
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  destinationText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  categoriesSection: {
    padding: 20,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E4E2',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginLeft: 12,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  categorySpecs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  specItem: {
    flex: 1,
  },
  specLabel: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '500',
    marginBottom: 4,
  },
  specValue: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
  },
  amenitiesContainer: {
    marginBottom: 16,
  },
  amenitiesLabel: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '500',
    marginBottom: 8,
  },
  amenitiesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  amenityTagText: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '500',
  },
  categoryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  categoryPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D4AF37',
  },
  viewButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  eventsSection: {
    padding: 20,
  },
  eventsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E4E2',
    alignItems: 'center',
  },
  eventIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  eventName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 6,
    textAlign: 'center',
  },
  eventDescription: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 12,
  },
  eventFooter: {
    width: '100%',
  },
  eventButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 8,
    borderRadius: 6,
  },
  eventButtonText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  eventServicesSection: {
    marginTop: 20,
  },
  servicesList: {
    gap: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  serviceContent: {
    flex: 1,
    marginLeft: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});