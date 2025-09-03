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
import { Search, MapPin, Calendar, Users, Plane } from 'lucide-react-native';

interface JetCategory {
  id: string;
  name: string;
  description: string;
  capacity: string;
  range: string;
  speed: string;
  price: string;
}

export default function JetsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const jetCategories: JetCategory[] = [
    {
      id: '1',
      name: 'Light Jets',
      description: 'Perfect for short to medium range flights',
      capacity: '4-8 passengers',
      range: '1,300-2,100 nm',
      speed: '400-480 mph',
      price: 'From $3,500/hour',
    },
    {
      id: '2',
      name: 'Mid-Size Jets',
      description: 'Ideal balance of comfort and efficiency',
      capacity: '6-9 passengers',
      range: '2,000-3,000 nm',
      speed: '450-520 mph',
      price: 'From $5,800/hour',
    },
    {
      id: '3',
      name: 'Heavy Jets',
      description: 'Maximum luxury for long-haul flights',
      capacity: '10-16 passengers',
      range: '3,500-6,000 nm',
      speed: '500-590 mph',
      price: 'From $8,500/hour',
    },
    {
      id: '4',
      name: 'Ultra Long Range',
      description: 'Intercontinental flights with ultimate comfort',
      capacity: '12-19 passengers',
      range: '6,000+ nm',
      speed: '560-650 mph',
      price: 'From $12,000/hour',
    },
  ];

  const quickSearches = ['NYC to Miami', 'LA to Vegas', 'London to Paris', 'NYC to London'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Private Jet Charter</Text>
        <Text style={styles.headerSubtitle}>Luxury aviation at your fingertips</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#888888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search routes, aircraft, or destinations..."
              placeholderTextColor="#888888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.quickFilters}>
            <TouchableOpacity style={styles.filterButton} onPress={() => console.log('Route filter pressed')}>
              <MapPin size={16} color="#D4AF37" />
              <Text style={styles.filterButtonText}>Route</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton} onPress={() => console.log('Dates filter pressed')}>
              <Calendar size={16} color="#D4AF37" />
              <Text style={styles.filterButtonText}>Dates</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton} onPress={() => console.log('Passengers filter pressed')}>
              <Users size={16} color="#D4AF37" />
              <Text style={styles.filterButtonText}>Passengers</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.quickSearchSection}>
          <Text style={styles.sectionTitle}>Popular Routes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickSearches.map((route, index) => (
              <TouchableOpacity key={index} style={styles.quickSearchItem} onPress={() => console.log(`Quick search: ${route}`)}>
                <Text style={styles.quickSearchText}>{route}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Aircraft Categories</Text>
          
          {jetCategories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryCard} onPress={() => console.log(`Category selected: ${category.name}`)}>
              <View style={styles.categoryHeader}>
                <Plane size={24} color="#D4AF37" />
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
              <Text style={styles.categoryDescription}>{category.description}</Text>
              
              <View style={styles.categorySpecs}>
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Capacity</Text>
                  <Text style={styles.specValue}>{category.capacity}</Text>
                </View>
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Range</Text>
                  <Text style={styles.specValue}>{category.range}</Text>
                </View>
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Speed</Text>
                  <Text style={styles.specValue}>{category.speed}</Text>
                </View>
              </View>

              <View style={styles.categoryFooter}>
                <Text style={styles.categoryPrice}>{category.price}</Text>
                <TouchableOpacity style={styles.viewButton} onPress={() => console.log(`View aircraft for: ${category.name}`)}>
                  <Text style={styles.viewButtonText}>View Aircraft</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Additional Services</Text>
          <View style={styles.servicesGrid}>
            <TouchableOpacity style={styles.serviceItem} onPress={() => console.log('Ground Transportation selected')}>
              <Text style={styles.serviceTitle}>Ground Transportation</Text>
              <Text style={styles.serviceDescription}>Luxury car & helicopter transfers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem} onPress={() => console.log('Catering selected')}>
              <Text style={styles.serviceTitle}>Catering</Text>
              <Text style={styles.serviceDescription}>Michelin-star dining at altitude</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem} onPress={() => console.log('Concierge selected')}>
              <Text style={styles.serviceTitle}>Concierge</Text>
              <Text style={styles.serviceDescription}>24/7 travel coordination</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem} onPress={() => console.log('Wi-Fi & Entertainment selected')}>
              <Text style={styles.serviceTitle}>Wi-Fi & Entertainment</Text>
              <Text style={styles.serviceDescription}>Stay connected in the sky</Text>
            </TouchableOpacity>
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
  quickSearchSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  quickSearchItem: {
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  quickSearchText: {
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
  servicesSection: {
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceItem: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E4E2',
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#666666',
  },
});