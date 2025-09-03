import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Dimensions,
} from 'react-native';
import { 
  Search, 
  Plane, 
  Ship, 
  Building2, 
  Star, 
  MapPin, 
  Calendar,
  TrendingUp,
  Globe,
  Award,
  Sparkles
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingDestinations = [
    { name: 'Maldives', type: 'Overwater Villas', trend: '+45%', image: '🏝️' },
    { name: 'Monaco', type: 'Yacht Charters', trend: '+32%', image: '🛥️' },
    { name: 'Aspen', type: 'Private Jets', trend: '+28%', image: '🎿' },
    { name: 'Santorini', type: 'Luxury Villas', trend: '+38%', image: '🏛️' },
  ];

  const featuredExperiences = [
    {
      title: 'Mediterranean Yacht Week',
      description: 'Exclusive 7-day charter through the French Riviera',
      price: 'From $125,000',
      category: 'Yacht Charter',
      rating: 5.0,
      icon: Ship,
    },
    {
      title: 'Tuscan Villa Retreat',
      description: 'Historic estate with private vineyard and chef',
      price: 'From $4,500/night',
      category: 'Villa Rental',
      rating: 4.9,
      icon: Building2,
    },
    {
      title: 'NYC to London Express',
      description: 'Gulfstream G650 with full concierge service',
      price: 'From $85,000',
      category: 'Private Jet',
      rating: 5.0,
      icon: Plane,
    },
  ];

  const luxuryCategories = [
    { name: 'Private Aviation', count: '2,400+ aircraft', icon: Plane, color: '#1E40AF' },
    { name: 'Yacht Charters', count: '1,800+ vessels', icon: Ship, color: '#0891B2' },
    { name: 'Elite Villas', count: '5,200+ properties', icon: Building2, color: '#7C3AED' },
    { name: 'Exclusive Events', count: '500+ venues', icon: Star, color: '#DC2626' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Discover</Text>
            <Text style={styles.headerSubtitle}>Curated luxury experiences</Text>
          </View>
          <TouchableOpacity style={styles.headerAction} onPress={() => console.log('Header action pressed')}>
          <Globe size={20} color="#000000" />
        </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Search size={18} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations, experiences..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.trendingSection}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color="#000000" />
            <Text style={styles.sectionTitle}>Trending Now</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {trendingDestinations.map((destination, index) => (
              <TouchableOpacity key={index} style={styles.trendingCard} onPress={() => console.log(`Trending destination selected: ${destination.name}`)}>
              <Text style={styles.destinationEmoji}>{destination.image}</Text>
              <Text style={styles.destinationName}>{destination.name}</Text>
              <Text style={styles.destinationType}>{destination.type}</Text>
              <View style={styles.trendBadge}>
                <Text style={styles.trendText}>{destination.trend}</Text>
              </View>
            </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Sparkles size={20} color="#000000" />
            <Text style={styles.sectionTitle}>Luxury Categories</Text>
          </View>
          
          <View style={styles.categoriesGrid}>
            {luxuryCategories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard} onPress={() => console.log(`Category selected: ${category.name}`)}>
                <View style={[styles.categoryIcon, { backgroundColor: `${category.color}15` }]}>
                  <category.icon size={24} color={category.color} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Award size={20} color="#000000" />
            <Text style={styles.sectionTitle}>Featured Experiences</Text>
          </View>
          
          {featuredExperiences.map((experience, index) => (
            <TouchableOpacity key={index} style={styles.experienceCard}>
              <View style={styles.experienceHeader}>
                <View style={styles.experienceIcon}>
                  <experience.icon size={20} color="#000000" />
                </View>
                <View style={styles.experienceInfo}>
                  <Text style={styles.experienceTitle}>{experience.title}</Text>
                  <Text style={styles.experienceCategory}>{experience.category}</Text>
                </View>
                <View style={styles.experienceRating}>
                  <Star size={12} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.ratingText}>{experience.rating}</Text>
                </View>
              </View>
              
              <Text style={styles.experienceDescription}>{experience.description}</Text>
              
              <View style={styles.experienceFooter}>
                <Text style={styles.experiencePrice}>{experience.price}</Text>
                <TouchableOpacity style={styles.exploreButton} onPress={() => console.log(`Explore experience: ${experience.title}`)}>
                  <Text style={styles.exploreButtonText}>Explore</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Market Insights</Text>
          
          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Text style={styles.insightTitle}>Peak Season Alert</Text>
              <View style={styles.insightBadge}>
                <Text style={styles.insightBadgeText}>Live</Text>
              </View>
            </View>
            <Text style={styles.insightDescription}>
              Mediterranean yacht bookings are 40% higher this season. Book early for the best selection.
            </Text>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Text style={styles.insightTitle}>New Routes Available</Text>
              <View style={styles.insightBadge}>
                <Text style={styles.insightBadgeText}>New</Text>
              </View>
            </View>
            <Text style={styles.insightDescription}>
              Direct private jet routes now available to exclusive destinations in the Seychelles.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  trendingSection: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginLeft: 12,
  },
  horizontalScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  trendingCard: {
    backgroundColor: '#FFFFFF',
    width: 140,
    padding: 20,
    borderRadius: 20,
    marginRight: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  destinationEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
    textAlign: 'center',
  },
  destinationType: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
    textAlign: 'center',
  },
  trendBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  trendText: {
    fontSize: 10,
    color: '#166534',
    fontWeight: '700',
  },
  categoriesSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  featuredSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  experienceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  experienceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  experienceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  experienceInfo: {
    flex: 1,
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 2,
  },
  experienceCategory: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  experienceRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  experienceDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 16,
  },
  experienceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  experiencePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  exploreButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  insightsSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  insightBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  insightBadgeText: {
    fontSize: 10,
    color: '#92400E',
    fontWeight: '700',
  },
  insightDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
});