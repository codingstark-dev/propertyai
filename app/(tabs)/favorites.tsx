import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Heart, Plane, Ship, Building2, Star, MapPin, Calendar, MoveHorizontal as MoreHorizontal, Filter } from 'lucide-react-native';

export default function FavoritesScreen() {
  const [activeFilter, setActiveFilter] = useState('all');

  const favorites = [
    {
      id: '1',
      type: 'jet',
      name: 'Gulfstream G650',
      category: 'Ultra Long Range',
      details: '14 passengers • 6,000nm range',
      price: 'From $18,500/flight',
      location: 'Available globally',
      rating: 5.0,
      savedDate: '2 days ago',
    },
    {
      id: '2',
      type: 'yacht',
      name: 'Serenity',
      category: 'Motor Yacht',
      details: '180ft • 12 guests • Monaco',
      price: 'From $85,000/week',
      location: 'Mediterranean',
      rating: 4.9,
      savedDate: '1 week ago',
    },
    {
      id: '3',
      type: 'villa',
      name: 'Villa Bellavista',
      category: 'Historic Estate',
      details: '8 bedrooms • 16 guests • Pool',
      price: 'From $4,500/night',
      location: 'Tuscany, Italy',
      rating: 4.8,
      savedDate: '3 days ago',
    },
    {
      id: '4',
      type: 'jet',
      name: 'Citation X+',
      category: 'Super Mid-Size',
      details: '8 passengers • 3,500nm range',
      price: 'From $12,800/flight',
      location: 'Available globally',
      rating: 4.9,
      savedDate: '5 days ago',
    },
  ];

  const filters = [
    { id: 'all', label: 'All', count: favorites.length },
    { id: 'jet', label: 'Jets', count: favorites.filter(f => f.type === 'jet').length },
    { id: 'yacht', label: 'Yachts', count: favorites.filter(f => f.type === 'yacht').length },
    { id: 'villa', label: 'Villas', count: favorites.filter(f => f.type === 'villa').length },
  ];

  const filteredFavorites = activeFilter === 'all' 
    ? favorites 
    : favorites.filter(f => f.type === activeFilter);

  const getIcon = (type: string) => {
    switch (type) {
      case 'jet': return Plane;
      case 'yacht': return Ship;
      case 'villa': return Building2;
      default: return Star;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'jet': return '#1E40AF';
      case 'yacht': return '#0891B2';
      case 'villa': return '#7C3AED';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Favorites</Text>
            <Text style={styles.headerSubtitle}>Your saved luxury experiences</Text>
          </View>
          <TouchableOpacity style={styles.headerAction}>
            <Filter size={20} color="#000000" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                activeFilter === filter.id && styles.activeFilterChip
              ]}
              onPress={() => setActiveFilter(filter.id)}
            >
              <Text style={[
                styles.filterChipText,
                activeFilter === filter.id && styles.activeFilterChipText
              ]}>
                {filter.label} ({filter.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredFavorites.length > 0 ? (
          <View style={styles.favoritesGrid}>
            {filteredFavorites.map((favorite) => {
              const IconComponent = getIcon(favorite.type);
              const typeColor = getTypeColor(favorite.type);
              
              return (
                <TouchableOpacity key={favorite.id} style={styles.favoriteCard}>
                  <View style={styles.favoriteHeader}>
                    <View style={[styles.favoriteIcon, { backgroundColor: `${typeColor}15` }]}>
                      <IconComponent size={20} color={typeColor} />
                    </View>
                    <TouchableOpacity style={styles.favoriteAction}>
                      <MoreHorizontal size={16} color="#6B7280" />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.favoriteName}>{favorite.name}</Text>
                  <Text style={styles.favoriteCategory}>{favorite.category}</Text>
                  <Text style={styles.favoriteDetails}>{favorite.details}</Text>

                  <View style={styles.favoriteLocation}>
                    <MapPin size={12} color="#6B7280" />
                    <Text style={styles.locationText}>{favorite.location}</Text>
                  </View>

                  <View style={styles.favoriteRating}>
                    <Star size={12} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.ratingText}>{favorite.rating}</Text>
                    <Text style={styles.savedDate}>• Saved {favorite.savedDate}</Text>
                  </View>

                  <View style={styles.favoriteFooter}>
                    <Text style={styles.favoritePrice}>{favorite.price}</Text>
                    <TouchableOpacity style={styles.bookButton}>
                      <Text style={styles.bookButtonText}>Book Now</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Heart size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptyDescription}>
              Start exploring luxury experiences and save your favorites here
            </Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Explore Now</Text>
            </TouchableOpacity>
          </View>
        )}
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
  filtersContainer: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  filterChip: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeFilterChip: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  filterChipText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeFilterChipText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  favoritesGrid: {
    padding: 24,
    gap: 16,
  },
  favoriteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  favoriteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  favoriteIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteAction: {
    padding: 4,
  },
  favoriteName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  favoriteCategory: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 8,
  },
  favoriteDetails: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 12,
  },
  favoriteLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  favoriteRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  savedDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  favoriteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  favoritePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  bookButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  exploreButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});