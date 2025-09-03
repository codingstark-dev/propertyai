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
import { Search, MapPin, Calendar, Users, Ship, Anchor } from 'lucide-react-native';

interface YachtCategory {
  id: string;
  name: string;
  description: string;
  length: string;
  guests: string;
  crew: string;
  price: string;
}

export default function YachtsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const yachtCategories: YachtCategory[] = [
    {
      id: '1',
      name: 'Motor Yachts',
      description: 'Speed and luxury for coastal cruising',
      length: '50-200+ ft',
      guests: '8-24 guests',
      crew: '3-15 crew',
      price: 'From $25,000/week',
    },
    {
      id: '2',
      name: 'Sailing Yachts',
      description: 'Classic elegance with wind-powered adventure',
      length: '60-250+ ft',
      guests: '6-20 guests',
      crew: '4-12 crew',
      price: 'From $18,000/week',
    },
    {
      id: '3',
      name: 'Catamarans',
      description: 'Stability and space for family charters',
      length: '40-120 ft',
      guests: '8-16 guests',
      crew: '2-8 crew',
      price: 'From $15,000/week',
    },
    {
      id: '4',
      name: 'Superyachts',
      description: 'Ultimate luxury with full-service amenities',
      length: '200-400+ ft',
      guests: '12-36 guests',
      crew: '20-50 crew',
      price: 'From $150,000/week',
    },
  ];

  const destinations = ['Mediterranean', 'Caribbean', 'French Riviera', 'Greek Islands', 'Bahamas'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Yacht Charter</Text>
        <Text style={styles.headerSubtitle}>Explore the seas in ultimate luxury</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#888888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search destinations, yacht names, or regions..."
              placeholderTextColor="#888888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.quickFilters}>
            <TouchableOpacity style={styles.filterButton}>
              <MapPin size={16} color="#D4AF37" />
              <Text style={styles.filterButtonText}>Destination</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Calendar size={16} color="#D4AF37" />
              <Text style={styles.filterButtonText}>Dates</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Users size={16} color="#D4AF37" />
              <Text style={styles.filterButtonText}>Guests</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.destinationsSection}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {destinations.map((destination, index) => (
              <TouchableOpacity key={index} style={styles.destinationCard}>
                <Text style={styles.destinationText}>{destination}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Yacht Categories</Text>
          
          {yachtCategories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <Ship size={24} color="#D4AF37" />
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
              <Text style={styles.categoryDescription}>{category.description}</Text>
              
              <View style={styles.categorySpecs}>
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Length</Text>
                  <Text style={styles.specValue}>{category.length}</Text>
                </View>
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Guests</Text>
                  <Text style={styles.specValue}>{category.guests}</Text>
                </View>
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Crew</Text>
                  <Text style={styles.specValue}>{category.crew}</Text>
                </View>
              </View>

              <View style={styles.categoryFooter}>
                <Text style={styles.categoryPrice}>{category.price}</Text>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View Yachts</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.amenitiesSection}>
          <Text style={styles.sectionTitle}>Yacht Amenities</Text>
          <View style={styles.amenitiesGrid}>
            <TouchableOpacity style={styles.amenityItem}>
              <Anchor size={20} color="#D4AF37" />
              <Text style={styles.amenityTitle}>Water Toys</Text>
              <Text style={styles.amenityDescription}>Jet skis, diving gear, kayaks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.amenityItem}>
              <Text style={styles.amenityIcon}>🍽️</Text>
              <Text style={styles.amenityTitle}>Fine Dining</Text>
              <Text style={styles.amenityDescription}>Private chef & sommelier</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.amenityItem}>
              <Text style={styles.amenityIcon}>🧘</Text>
              <Text style={styles.amenityTitle}>Wellness</Text>
              <Text style={styles.amenityDescription}>Spa, gym, yoga deck</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.amenityItem}>
              <Text style={styles.amenityIcon}>🎵</Text>
              <Text style={styles.amenityTitle}>Entertainment</Text>
              <Text style={styles.amenityDescription}>Cinema, nightclub, DJ booth</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Charter Services</Text>
          <View style={styles.servicesList}>
            <View style={styles.serviceItem}>
              <Text style={styles.serviceTitle}>Itinerary Planning</Text>
              <Text style={styles.serviceDescription}>Custom routes with local insights and seasonal recommendations</Text>
            </View>
            <View style={styles.serviceItem}>
              <Text style={styles.serviceTitle}>Provisioning</Text>
              <Text style={styles.serviceDescription}>Gourmet food, premium beverages, and special dietary accommodations</Text>
            </View>
            <View style={styles.serviceItem}>
              <Text style={styles.serviceTitle}>Shore Excursions</Text>
              <Text style={styles.serviceDescription}>Private tours, restaurant reservations, and VIP experiences</Text>
            </View>
            <View style={styles.serviceItem}>
              <Text style={styles.serviceTitle}>Concierge Support</Text>
              <Text style={styles.serviceDescription}>24/7 assistance for any requests during your charter</Text>
            </View>
          </View>
        </View>
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
    justifyContent: 'space-between',
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
  amenitiesSection: {
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenityItem: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E4E2',
    alignItems: 'center',
  },
  amenityIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  amenityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
    marginTop: 8,
  },
  amenityDescription: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  servicesSection: {
    padding: 20,
  },
  servicesList: {
    gap: 16,
  },
  serviceItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 6,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});