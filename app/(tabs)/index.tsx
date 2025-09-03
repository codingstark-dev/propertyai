import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Send, 
  Mic, 
  Plane, 
  Ship, 
  Building2, 
  Calendar, 
  MapPin, 
  Users, 
  Star,
  Clock,
  CreditCard,
  Check,
  ArrowRight,
  Sparkles,
  Heart
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Message {
  id: string;
  text?: string;
  isUser: boolean;
  timestamp: Date;
  component?: 'quick-start' | 'jet-search' | 'yacht-search' | 'villa-search' | 'booking-card' | 'payment-flow' | 'confirmation' | 'preference-intake' | 'recommendations' | 'comparison' | 'itinerary';
  data?: any;
  context?: {
    sessionId: string;
    userId?: string;
    preferences?: UserPreferences;
    conversationHistory?: string[];
  };
}

interface UserPreferences {
  partySize?: number;
  luggage?: string;
  pets?: boolean;
  dietaryNeeds?: string[];
  medicalNotes?: string;
  mobilityNotes?: string;
  preferredLanguage?: string;
  budgetRange?: {
    min: number;
    max: number;
  };
  travelStyle?: 'luxury' | 'business' | 'leisure';
  frequentDestinations?: string[];
  pastBookings?: any[];
}

interface ConversationContext {
  sessionId: string;
  userId?: string;
  preferences: UserPreferences;
  conversationHistory: Message[];
  currentIntent?: string;
  lastActivity: Date;
}

export default function ChatScreen() {
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    sessionId: `session_${Date.now()}`,
    preferences: {},
    conversationHistory: [],
    lastActivity: new Date(),
  });
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to your luxury travel assistant! I can help you book private jets, yachts, and exclusive villas. What would you like to explore today?',
      isUser: false,
      timestamp: new Date(),
      context: {
        sessionId: conversationContext.sessionId,
        preferences: conversationContext.preferences,
        conversationHistory: [],
      },
    },
    {
      id: '2',
      component: 'quick-start',
      isUser: false,
      timestamp: new Date(),
      context: {
        sessionId: conversationContext.sessionId,
        preferences: conversationContext.preferences,
        conversationHistory: [],
      },
    },
  ]);
  const [inputText, setInputText] = useState('');
  
  // Context memory management
  const updateConversationContext = (updates: Partial<ConversationContext>) => {
    setConversationContext(prev => ({
      ...prev,
      ...updates,
      lastActivity: new Date(),
    }));
  };
  
  const addToConversationHistory = (message: Message) => {
    setConversationContext(prev => ({
      ...prev,
      conversationHistory: [...prev.conversationHistory, message],
      lastActivity: new Date(),
    }));
  };
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const sendMessage = () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date(),
        context: {
          sessionId: conversationContext.sessionId,
          preferences: conversationContext.preferences,
          conversationHistory: conversationContext.conversationHistory.map(m => m.text || ''),
        },
      };

      setMessages(prev => [...prev, userMessage]);
      addToConversationHistory(userMessage);
      const query = inputText.toLowerCase();
      setInputText('');
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        let aiResponse: Message;

        if (query.includes('jet') || query.includes('flight') || query.includes('fly')) {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            text: 'Let me find the perfect private jet for your journey. I\'ll need a few details to show you the best options.',
            isUser: false,
            timestamp: new Date(),
            context: {
              sessionId: conversationContext.sessionId,
              preferences: conversationContext.preferences,
              conversationHistory: conversationContext.conversationHistory.map(m => m.text || ''),
            },
          };
          setMessages(prev => [...prev, aiResponse]);
          addToConversationHistory(aiResponse);

          setTimeout(() => {
            const jetSearch: Message = {
              id: (Date.now() + 2).toString(),
              component: 'jet-search',
              isUser: false,
              timestamp: new Date(),
              context: {
                sessionId: conversationContext.sessionId,
                preferences: conversationContext.preferences,
                conversationHistory: conversationContext.conversationHistory.map(m => m.text || ''),
              },
            };
            setMessages(prev => [...prev, jetSearch]);
            addToConversationHistory(jetSearch);
          }, 1000);

        } else if (query.includes('yacht') || query.includes('boat') || query.includes('charter')) {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            text: 'Excellent! I\'ll help you find the perfect yacht charter. Let me create a personalized search for you.',
            isUser: false,
            timestamp: new Date(),
            context: {
              sessionId: conversationContext.sessionId,
              preferences: conversationContext.preferences,
              conversationHistory: conversationContext.conversationHistory.map(m => m.text || ''),
            },
          };
          setMessages(prev => [...prev, aiResponse]);
          addToConversationHistory(aiResponse);

          setTimeout(() => {
            const yachtSearch: Message = {
              id: (Date.now() + 2).toString(),
              component: 'yacht-search',
              isUser: false,
              timestamp: new Date(),
              context: {
                sessionId: conversationContext.sessionId,
                preferences: conversationContext.preferences,
                conversationHistory: conversationContext.conversationHistory.map(m => m.text || ''),
              },
            };
            setMessages(prev => [...prev, yachtSearch]);
            addToConversationHistory(yachtSearch);
          }, 1000);

        } else if (query.includes('villa') || query.includes('house') || query.includes('stay')) {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            text: 'Perfect! I\'ll help you discover exclusive villas and luxury accommodations. Let me set up a custom search.',
            isUser: false,
            timestamp: new Date(),
            context: {
              sessionId: conversationContext.sessionId,
              preferences: conversationContext.preferences,
              conversationHistory: conversationContext.conversationHistory.map(m => m.text || ''),
            },
          };
          setMessages(prev => [...prev, aiResponse]);
          addToConversationHistory(aiResponse);

          setTimeout(() => {
            const villaSearch: Message = {
              id: (Date.now() + 2).toString(),
              component: 'villa-search',
              isUser: false,
              timestamp: new Date(),
              context: {
                sessionId: conversationContext.sessionId,
                preferences: conversationContext.preferences,
                conversationHistory: conversationContext.conversationHistory.map(m => m.text || ''),
              },
            };
            setMessages(prev => [...prev, villaSearch]);
            addToConversationHistory(villaSearch);
          }, 1000);

        } else {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            text: 'I\'m here to help with all your luxury travel needs. Here are some ways I can assist you:',
            isUser: false,
            timestamp: new Date(),
            context: {
              sessionId: conversationContext.sessionId,
              preferences: conversationContext.preferences,
              conversationHistory: conversationContext.conversationHistory.map(m => m.text || ''),
            },
          };
          setMessages(prev => [...prev, aiResponse]);
          addToConversationHistory(aiResponse);

          setTimeout(() => {
            const quickStart: Message = {
              id: (Date.now() + 2).toString(),
              component: 'quick-start',
              isUser: false,
              timestamp: new Date(),
              context: {
                sessionId: conversationContext.sessionId,
                preferences: conversationContext.preferences,
                conversationHistory: conversationContext.conversationHistory.map(m => m.text || ''),
              },
            };
            setMessages(prev => [...prev, quickStart]);
            addToConversationHistory(quickStart);
          }, 1000);
        }
      }, 1500);

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleQuickAction = (action: string) => {
    let responseText = '';
    let component: Message['component'] = undefined;
    
    switch (action) {
      case 'jets':
        responseText = 'Let me help you find the perfect private jet. What\'s your departure city and destination?';
        component = 'jet-search';
        break;
      case 'yachts':
        responseText = 'I\'ll help you charter an amazing yacht. Where would you like to sail?';
        component = 'yacht-search';
        break;
      case 'villas':
        responseText = 'Let\'s find you an exclusive villa. What destination interests you?';
        component = 'villa-search';
        break;
      case 'events':
        responseText = 'I can help plan extraordinary events. What type of event are you organizing?';
        break;
      case 'preferences':
        responseText = 'Let me learn about your travel preferences to provide better recommendations.';
        component = 'preference-intake';
        break;
      default:
        setInputText(action);
        setTimeout(() => sendMessage(), 100);
        return;
    }
    
    const aiMessage: Message = {
      id: Date.now().toString(),
      text: responseText,
      isUser: false,
      timestamp: new Date(),
      component,
      context: {
        sessionId: conversationContext.sessionId,
        preferences: conversationContext.preferences,
        conversationHistory: conversationContext.conversationHistory.map(m => m.text || ''),
      },
    };
    
    setMessages(prev => [...prev, aiMessage]);
    addToConversationHistory(aiMessage);
  };

  const handleBookingSelect = (type: string, item: any) => {
    const bookingMessage: Message = {
      id: Date.now().toString(),
      text: `Great choice! I've selected the ${item.name} for you. Let me prepare the booking details.`,
      isUser: false,
      timestamp: new Date(),
    };

    const bookingCard: Message = {
      id: (Date.now() + 1).toString(),
      component: 'booking-card',
      isUser: false,
      timestamp: new Date(),
      data: { type, item },
    };

    setMessages(prev => [...prev, bookingMessage, bookingCard]);
    
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handlePayment = (bookingData: any) => {
    const paymentMessage: Message = {
      id: Date.now().toString(),
      text: 'Perfect! Let me process your booking. Here are the payment options:',
      isUser: false,
      timestamp: new Date(),
    };

    const paymentFlow: Message = {
      id: (Date.now() + 1).toString(),
      component: 'payment-flow',
      isUser: false,
      timestamp: new Date(),
      data: bookingData,
    };

    setMessages(prev => [...prev, paymentMessage, paymentFlow]);
    
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleConfirmBooking = (paymentData: any) => {
    const confirmationMessage: Message = {
      id: Date.now().toString(),
      text: 'Booking confirmed! Your luxury experience is secured. Here are your confirmation details:',
      isUser: false,
      timestamp: new Date(),
    };

    const confirmation: Message = {
      id: (Date.now() + 1).toString(),
      component: 'confirmation',
      isUser: false,
      timestamp: new Date(),
      data: paymentData,
    };

    setMessages(prev => [...prev, confirmationMessage, confirmation]);
    
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderQuickStart = () => (
    <View style={styles.generativeContainer}>
      <View style={styles.titleSection}>
        <Sparkles size={24} color="#6366F1" />
        <Text style={styles.generativeTitle}>How can I assist you today?</Text>
        <Text style={styles.generativeSubtitle}>Discover luxury experiences tailored just for you</Text>
      </View>
      
      <View style={styles.quickActionsGrid}>
        <View style={styles.quickActionRow}>
          <TouchableOpacity 
            style={styles.modernActionCard}
            onPress={() => handleQuickAction('Book a private jet from New York to Miami tomorrow')}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.actionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.actionContent}>
                <View style={styles.actionIconContainer}>
                  <Plane size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.actionTitle}>Private Jets</Text>
                <Text style={styles.actionSubtitle}>Instant charter</Text>
                <View style={styles.actionBadge}>
                  <Text style={styles.actionBadgeText}>✈️ Premium</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.modernActionCard}
            onPress={() => handleQuickAction('Charter a luxury yacht in the Mediterranean for next week')}
          >
            <LinearGradient
              colors={['#4facfe', '#00f2fe']}
              style={styles.actionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.actionContent}>
                <View style={styles.actionIconContainer}>
                  <Ship size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.actionTitle}>Yacht Charter</Text>
                <Text style={styles.actionSubtitle}>Exclusive access</Text>
                <View style={styles.actionBadge}>
                  <Text style={styles.actionBadgeText}>🛥️ Luxury</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.quickActionRow}>
          <TouchableOpacity 
            style={styles.modernActionCard}
            onPress={() => handleQuickAction('Find a luxury villa in Tuscany for 12 guests')}
          >
            <LinearGradient
              colors={['#fa709a', '#fee140']}
              style={styles.actionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.actionContent}>
                <View style={styles.actionIconContainer}>
                  <Building2 size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.actionTitle}>Elite Villas</Text>
                <Text style={styles.actionSubtitle}>Private estates</Text>
                <View style={styles.actionBadge}>
                  <Text style={styles.actionBadgeText}>🏖️ Exclusive</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.modernActionCard}
            onPress={() => handleQuickAction('preferences')}
          >
            <LinearGradient
              colors={['#a8edea', '#fed6e3']}
              style={styles.actionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.actionContent}>
                <View style={styles.actionIconContainer}>
                  <Heart size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.actionTitle}>My Preferences</Text>
                <Text style={styles.actionSubtitle}>Travel preferences</Text>
                <View style={styles.actionBadge}>
                  <Text style={styles.actionBadgeText}>⚙️ Personal</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.quickStatsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>500+</Text>
          <Text style={styles.statLabel}>Luxury Partners</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>24/7</Text>
          <Text style={styles.statLabel}>Concierge</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>150+</Text>
          <Text style={styles.statLabel}>Destinations</Text>
        </View>
      </View>
    </View>
  );

  const renderJetSearch = () => (
    <View style={styles.generativeContainer}>
      <View style={styles.searchHeader}>
        <Plane size={24} color="#000000" />
        <Text style={styles.searchTitle}>Private Jet Search</Text>
      </View>
      
      <View style={styles.searchForm}>
        <View style={styles.formRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>From</Text>
            <View style={styles.modernInput}>
              <MapPin size={16} color="#666666" />
              <Text style={styles.inputValue}>New York (TEB)</Text>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>To</Text>
            <View style={styles.modernInput}>
              <MapPin size={16} color="#666666" />
              <Text style={styles.inputValue}>Miami (OPF)</Text>
            </View>
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Departure</Text>
            <View style={styles.modernInput}>
              <Calendar size={16} color="#666666" />
              <Text style={styles.inputValue}>Tomorrow, 2:00 PM</Text>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Passengers</Text>
            <View style={styles.modernInput}>
              <Users size={16} color="#666666" />
              <Text style={styles.inputValue}>4 passengers</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search Available Jets</Text>
          <ArrowRight size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.jetResults}>
        <Text style={styles.resultsTitle}>Available Aircraft</Text>
        
        {[
          { name: 'Gulfstream G650', category: 'Ultra Long Range', capacity: '14 pax', price: '$18,500', duration: '2h 45m', available: true },
          { name: 'Citation X+', category: 'Super Mid-Size', capacity: '8 pax', price: '$12,800', duration: '2h 55m', available: true },
          { name: 'Falcon 7X', category: 'Heavy Jet', capacity: '12 pax', price: '$15,200', duration: '2h 50m', available: false },
        ].map((jet, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.resultCard, !jet.available && styles.unavailableCard]}
            onPress={() => jet.available && handleBookingSelect('jet', jet)}
            disabled={!jet.available}
          >
            <View style={styles.resultHeader}>
              <View>
                <Text style={styles.resultName}>{jet.name}</Text>
                <Text style={styles.resultCategory}>{jet.category}</Text>
              </View>
              <View style={styles.resultStatus}>
                {jet.available ? (
                  <View style={styles.availableBadge}>
                    <Text style={styles.availableText}>Available</Text>
                  </View>
                ) : (
                  <View style={styles.unavailableBadge}>
                    <Text style={styles.unavailableText}>Booked</Text>
                  </View>
                )}
              </View>
            </View>
            
            <View style={styles.resultSpecs}>
              <Text style={styles.specText}>{jet.capacity}</Text>
              <Text style={styles.specDivider}>•</Text>
              <Text style={styles.specText}>{jet.duration}</Text>
            </View>
            
            <View style={styles.resultFooter}>
              <Text style={styles.resultPrice}>{jet.price}</Text>
              {jet.available && (
                <View style={styles.selectIndicator}>
                  <ArrowRight size={16} color="#000000" />
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderYachtSearch = () => (
    <View style={styles.generativeContainer}>
      <View style={styles.searchHeader}>
        <Ship size={24} color="#000000" />
        <Text style={styles.searchTitle}>Yacht Charter Search</Text>
      </View>
      
      <View style={styles.searchForm}>
        <View style={styles.formRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Destination</Text>
            <View style={styles.modernInput}>
              <MapPin size={16} color="#666666" />
              <Text style={styles.inputValue}>Mediterranean</Text>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Duration</Text>
            <View style={styles.modernInput}>
              <Calendar size={16} color="#666666" />
              <Text style={styles.inputValue}>7 days</Text>
            </View>
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Check-in</Text>
            <View style={styles.modernInput}>
              <Calendar size={16} color="#666666" />
              <Text style={styles.inputValue}>Dec 15, 2024</Text>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Guests</Text>
            <View style={styles.modernInput}>
              <Users size={16} color="#666666" />
              <Text style={styles.inputValue}>8 guests</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search Available Yachts</Text>
          <ArrowRight size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.yachtResults}>
        <Text style={styles.resultsTitle}>Available Yachts</Text>
        
        {[
          { name: 'Serenity', length: '180ft', guests: '12 guests', price: '$85,000/week', location: 'Monaco', rating: 4.9 },
          { name: 'Ocean Pearl', length: '220ft', guests: '16 guests', price: '$125,000/week', location: 'Cannes', rating: 5.0 },
          { name: 'Azure Dream', length: '160ft', guests: '10 guests', price: '$75,000/week', location: 'St. Tropez', rating: 4.8 },
        ].map((yacht, index) => (
          <TouchableOpacity
            key={index}
            style={styles.resultCard}
            onPress={() => handleBookingSelect('yacht', yacht)}
          >
            <View style={styles.resultHeader}>
              <View>
                <Text style={styles.resultName}>{yacht.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={12} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.ratingText}>{yacht.rating}</Text>
                </View>
              </View>
              <Text style={styles.yachtLocation}>{yacht.location}</Text>
            </View>
            
            <View style={styles.resultSpecs}>
              <Text style={styles.specText}>{yacht.length}</Text>
              <Text style={styles.specDivider}>•</Text>
              <Text style={styles.specText}>{yacht.guests}</Text>
            </View>
            
            <View style={styles.resultFooter}>
              <Text style={styles.resultPrice}>{yacht.price}</Text>
              <View style={styles.selectIndicator}>
                <ArrowRight size={16} color="#000000" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderVillaSearch = () => (
    <View style={styles.generativeContainer}>
      <View style={styles.searchHeader}>
        <Building2 size={24} color="#000000" />
        <Text style={styles.searchTitle}>Villa Search</Text>
      </View>
      
      <View style={styles.searchForm}>
        <View style={styles.formRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Destination</Text>
            <View style={styles.modernInput}>
              <MapPin size={16} color="#666666" />
              <Text style={styles.inputValue}>Tuscany, Italy</Text>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Guests</Text>
            <View style={styles.modernInput}>
              <Users size={16} color="#666666" />
              <Text style={styles.inputValue}>12 guests</Text>
            </View>
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Check-in</Text>
            <View style={styles.modernInput}>
              <Calendar size={16} color="#666666" />
              <Text style={styles.inputValue}>Dec 15, 2024</Text>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Check-out</Text>
            <View style={styles.modernInput}>
              <Calendar size={16} color="#666666" />
              <Text style={styles.inputValue}>Dec 22, 2024</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search Available Villas</Text>
          <ArrowRight size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.villaResults}>
        <Text style={styles.resultsTitle}>Available Properties</Text>
        
        {[
          { name: 'Villa Bellavista', bedrooms: '8 bedrooms', guests: '16 guests', price: '$4,500/night', location: 'Chianti Hills', rating: 4.9 },
          { name: 'Casa Moderna', bedrooms: '6 bedrooms', guests: '12 guests', price: '$3,200/night', location: 'Florence', rating: 5.0 },
          { name: 'Palazzo Antico', bedrooms: '10 bedrooms', guests: '20 guests', price: '$6,800/night', location: 'Siena', rating: 4.8 },
        ].map((villa, index) => (
          <TouchableOpacity
            key={index}
            style={styles.resultCard}
            onPress={() => handleBookingSelect('villa', villa)}
          >
            <View style={styles.resultHeader}>
              <View>
                <Text style={styles.resultName}>{villa.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={12} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.ratingText}>{villa.rating}</Text>
                </View>
              </View>
              <Text style={styles.villaLocation}>{villa.location}</Text>
            </View>
            
            <View style={styles.resultSpecs}>
              <Text style={styles.specText}>{villa.bedrooms}</Text>
              <Text style={styles.specDivider}>•</Text>
              <Text style={styles.specText}>{villa.guests}</Text>
            </View>
            
            <View style={styles.resultFooter}>
              <Text style={styles.resultPrice}>{villa.price}</Text>
              <View style={styles.selectIndicator}>
                <ArrowRight size={16} color="#000000" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderBookingCard = (data: any) => (
    <View style={styles.bookingCardContainer}>
      <View style={styles.bookingCardHeader}>
        <Text style={styles.bookingCardTitle}>Booking Summary</Text>
        <View style={styles.bookingBadge}>
          <Text style={styles.bookingBadgeText}>Selected</Text>
        </View>
      </View>

      <View style={styles.bookingDetails}>
        <Text style={styles.bookingItemName}>{data.item.name}</Text>
        <Text style={styles.bookingItemDetails}>
          {data.type === 'jet' && `${data.item.category} • ${data.item.capacity} • ${data.item.duration}`}
          {data.type === 'yacht' && `${data.item.length} • ${data.item.guests} • ${data.item.location}`}
          {data.type === 'villa' && `${data.item.bedrooms} • ${data.item.guests} • ${data.item.location}`}
        </Text>
        
        <View style={styles.pricingBreakdown}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Base Rate</Text>
            <Text style={styles.priceValue}>{data.item.price}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service Fee</Text>
            <Text style={styles.priceValue}>$2,500</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Taxes & Fees</Text>
            <Text style={styles.priceValue}>$1,200</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              ${(parseInt(data.item.price.replace(/[^0-9]/g, '')) + 3700).toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.proceedButton}
        onPress={() => handlePayment(data)}
      >
        <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
        <CreditCard size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  const renderPaymentFlow = (data: any) => (
    <View style={styles.paymentContainer}>
      <View style={styles.paymentHeader}>
        <CreditCard size={24} color="#000000" />
        <Text style={styles.paymentTitle}>Secure Payment</Text>
      </View>

      <View style={styles.paymentMethods}>
        <TouchableOpacity style={styles.paymentMethod}>
          <View style={styles.paymentMethodIcon}>
            <CreditCard size={20} color="#000000" />
          </View>
          <View style={styles.paymentMethodInfo}>
            <Text style={styles.paymentMethodName}>Credit Card</Text>
            <Text style={styles.paymentMethodDesc}>Visa, Mastercard, Amex</Text>
          </View>
          <View style={styles.paymentMethodCheck}>
            <Check size={16} color="#000000" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.paymentMethod}>
          <View style={styles.paymentMethodIcon}>
            <Text style={styles.bankIcon}>🏦</Text>
          </View>
          <View style={styles.paymentMethodInfo}>
            <Text style={styles.paymentMethodName}>Wire Transfer</Text>
            <Text style={styles.paymentMethodDesc}>Bank to bank transfer</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.paymentSummary}>
        <Text style={styles.paymentSummaryTitle}>Payment Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>{data.item.name}</Text>
          <Text style={styles.summaryValue}>{data.item.price}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Amount</Text>
          <Text style={styles.summaryTotal}>
            ${(parseInt(data.item.price.replace(/[^0-9]/g, '')) + 3700).toLocaleString()}
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.payButton}
        onPress={() => handleConfirmBooking(data)}
      >
        <Text style={styles.payButtonText}>Complete Booking</Text>
        <Check size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  const renderConfirmation = (data: any) => (
    <View style={styles.confirmationContainer}>
      <View style={styles.confirmationHeader}>
        <View style={styles.successIcon}>
          <Check size={32} color="#FFFFFF" />
        </View>
        <Text style={styles.confirmationTitle}>Booking Confirmed!</Text>
        <Text style={styles.confirmationSubtitle}>Your luxury experience is secured</Text>
      </View>

      <View style={styles.confirmationDetails}>
        <View style={styles.confirmationRow}>
          <Text style={styles.confirmationLabel}>Booking ID</Text>
          <Text style={styles.confirmationValue}>LUX-{Date.now().toString().slice(-6)}</Text>
        </View>
        <View style={styles.confirmationRow}>
          <Text style={styles.confirmationLabel}>Service</Text>
          <Text style={styles.confirmationValue}>{data.item.name}</Text>
        </View>
        <View style={styles.confirmationRow}>
          <Text style={styles.confirmationLabel}>Total Paid</Text>
          <Text style={styles.confirmationValue}>
            ${(parseInt(data.item.price.replace(/[^0-9]/g, '')) + 3700).toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={styles.nextSteps}>
        <Text style={styles.nextStepsTitle}>What's Next?</Text>
        <View style={styles.stepItem}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <Text style={styles.stepText}>Confirmation email sent to your inbox</Text>
        </View>
        <View style={styles.stepItem}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <Text style={styles.stepText}>Concierge will contact you within 2 hours</Text>
        </View>
        <View style={styles.stepItem}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <Text style={styles.stepText}>Final details and preferences coordination</Text>
        </View>
      </View>
    </View>
  );

  const renderPreferenceIntake = () => (
    <View style={styles.generativeContainer}>
      <Text style={styles.generativeTitle}>Tell us about your travel preferences</Text>
      
      <View style={styles.preferenceForm}>
        <View style={styles.preferenceSection}>
          <Text style={styles.preferenceSectionTitle}>Party Details</Text>
          <View style={styles.formRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Party Size</Text>
              <TouchableOpacity style={styles.modernInput}>
                <Users size={16} color="#6B7280" />
                <Text style={styles.inputValue}>2 guests</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Luggage</Text>
              <TouchableOpacity style={styles.modernInput}>
                <Text style={styles.inputValue}>Standard</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.preferenceSection}>
          <Text style={styles.preferenceSectionTitle}>Travel Style</Text>
          <View style={styles.travelStyleOptions}>
            <TouchableOpacity style={[styles.styleOption, styles.styleOptionSelected]}>
              <Text style={[styles.styleOptionText, styles.styleOptionTextSelected]}>Luxury</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.styleOption}>
              <Text style={styles.styleOptionText}>Business</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.styleOption}>
              <Text style={styles.styleOptionText}>Leisure</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.preferenceSection}>
          <Text style={styles.preferenceSectionTitle}>Budget Range</Text>
          <View style={styles.formRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Minimum</Text>
              <TouchableOpacity style={styles.modernInput}>
                <Text style={styles.inputValue}>$50,000</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Maximum</Text>
              <TouchableOpacity style={styles.modernInput}>
                <Text style={styles.inputValue}>$500,000</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.preferenceSection}>
          <Text style={styles.preferenceSectionTitle}>Special Requirements</Text>
          <TouchableOpacity style={styles.modernInput}>
            <Text style={styles.inputValue}>Dietary restrictions, accessibility needs...</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.savePreferencesButton}>
          <Text style={styles.savePreferencesButtonText}>Save Preferences</Text>
          <Check size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRecommendations = (data?: any) => {
    // Sample recommendation data - in real app, this would come from AI analysis
    const recommendations = {
      jets: [
        { name: 'Gulfstream G650', category: 'Ultra Long Range', price: '$85,000', rating: 4.9, available: true },
        { name: 'Bombardier Global 7500', category: 'Ultra Long Range', price: '$92,000', rating: 4.8, available: true }
      ],
      yachts: [
        { name: 'Azzam', category: 'Superyacht', price: '$125,000/week', rating: 5.0, available: true },
        { name: 'Eclipse', category: 'Megayacht', price: '$98,000/week', rating: 4.9, available: false }
      ],
      villas: [
        { name: 'Villa Cimbrone', location: 'Amalfi Coast', price: '$15,000/night', rating: 4.8, available: true },
        { name: 'Casa Kimball', location: 'Dominican Republic', price: '$12,000/night', rating: 4.7, available: true }
      ]
    };

    return (
      <View style={styles.generativeContainer}>
        <View style={styles.searchHeader}>
          <Sparkles size={24} color="#000000" />
          <Text style={styles.searchTitle}>Personalized Recommendations</Text>
        </View>

        <Text style={styles.resultsTitle}>Private Jets</Text>
        <View style={styles.jetResults}>
          {recommendations.jets.map((jet, index) => (
            <TouchableOpacity key={index} style={[styles.resultCard, !jet.available && styles.unavailableCard]}>
              <View style={styles.resultHeader}>
                <View>
                  <Text style={styles.resultName}>{jet.name}</Text>
                  <Text style={styles.resultCategory}>{jet.category}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={12} color="#FCD34D" fill="#FCD34D" />
                    <Text style={styles.ratingText}>{jet.rating}</Text>
                  </View>
                </View>
                <View style={styles.resultStatus}>
                  <View style={jet.available ? styles.availableBadge : styles.unavailableBadge}>
                    <Text style={jet.available ? styles.availableText : styles.unavailableText}>
                      {jet.available ? 'Available' : 'Unavailable'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.resultFooter}>
                <Text style={styles.resultPrice}>{jet.price}</Text>
                <TouchableOpacity style={styles.selectIndicator}>
                  <ArrowRight size={16} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.resultsTitle}>Luxury Yachts</Text>
        <View style={styles.yachtResults}>
          {recommendations.yachts.map((yacht, index) => (
            <TouchableOpacity key={index} style={[styles.resultCard, !yacht.available && styles.unavailableCard]}>
              <View style={styles.resultHeader}>
                <View>
                  <Text style={styles.resultName}>{yacht.name}</Text>
                  <Text style={styles.resultCategory}>{yacht.category}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={12} color="#FCD34D" fill="#FCD34D" />
                    <Text style={styles.ratingText}>{yacht.rating}</Text>
                  </View>
                </View>
                <View style={styles.resultStatus}>
                  <View style={yacht.available ? styles.availableBadge : styles.unavailableBadge}>
                    <Text style={yacht.available ? styles.availableText : styles.unavailableText}>
                      {yacht.available ? 'Available' : 'Unavailable'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.resultFooter}>
                <Text style={styles.resultPrice}>{yacht.price}</Text>
                <TouchableOpacity style={styles.selectIndicator}>
                  <ArrowRight size={16} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.resultsTitle}>Elite Villas</Text>
        <View style={styles.villaResults}>
          {recommendations.villas.map((villa, index) => (
            <TouchableOpacity key={index} style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <View>
                  <Text style={styles.resultName}>{villa.name}</Text>
                  <Text style={styles.villaLocation}>{villa.location}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={12} color="#FCD34D" fill="#FCD34D" />
                    <Text style={styles.ratingText}>{villa.rating}</Text>
                  </View>
                </View>
                <View style={styles.resultStatus}>
                  <View style={villa.available ? styles.availableBadge : styles.unavailableBadge}>
                    <Text style={villa.available ? styles.availableText : styles.unavailableText}>
                      {villa.available ? 'Available' : 'Unavailable'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.resultFooter}>
                <Text style={styles.resultPrice}>{villa.price}</Text>
                <TouchableOpacity style={styles.selectIndicator}>
                  <ArrowRight size={16} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderMessageComponent = (message: Message) => {
    switch (message.component) {
      case 'quick-start':
        return renderQuickStart();
      case 'jet-search':
        return renderJetSearch();
      case 'yacht-search':
        return renderYachtSearch();
      case 'villa-search':
        return renderVillaSearch();
      case 'preference-intake':
        return renderPreferenceIntake();
      case 'recommendations':
        return renderRecommendations(message.data);
      case 'booking-card':
        return renderBookingCard(message.data);
      case 'payment-flow':
        return renderPaymentFlow(message.data);
      case 'confirmation':
        return renderConfirmation(message.data);
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.aiAvatar}>
              <Sparkles size={20} color="#000000" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Luxury AI</Text>
              <View style={styles.statusContainer}>
                <View style={styles.onlineIndicator} />
                <Text style={styles.statusText}>Online</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.headerAction}>
            <Heart size={20} color="#000000" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <Animated.View key={message.id} style={{ opacity: fadeAnim }}>
            {message.text && (
              <View
                style={[
                  styles.messageContainer,
                  message.isUser ? styles.userMessage : styles.aiMessage,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.isUser ? styles.userMessageText : styles.aiMessageText,
                  ]}
                >
                  {message.text}
                </Text>
                <Text
                  style={[
                    styles.timestamp,
                    message.isUser ? styles.userTimestamp : styles.aiTimestamp,
                  ]}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            )}
            {message.component && (
              <View style={styles.componentContainer}>
                {renderMessageComponent(message)}
              </View>
            )}
          </Animated.View>
        ))}

        {isTyping && (
          <View style={styles.typingContainer}>
            <View style={styles.typingDots}>
              <View style={styles.typingDot} />
              <View style={styles.typingDot} />
              <View style={styles.typingDot} />
            </View>
            <Text style={styles.typingText}>AI is thinking...</Text>
          </View>
        )}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask about jets, yachts, villas, or events..."
            placeholderTextColor="#AAAAAA"
            multiline
            maxLength={500}
          />
          <TouchableOpacity style={styles.micButton}>
            <Mic size={18} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sendButton, inputText.trim() && styles.sendButtonActive]} 
            onPress={sendMessage}
          >
            <Send size={16} color={inputText.trim() ? "#FFFFFF" : "#CCCCCC"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    borderBottomColor: '#F0F0F0',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  headerAction: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 10,
  },
  messageContainer: {
    maxWidth: '85%',
    marginBottom: 16,
    padding: 16,
    borderRadius: 20,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#000000',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  aiMessageText: {
    color: '#000000',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 8,
    fontWeight: '500',
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  aiTimestamp: {
    color: '#9CA3AF',
  },
  componentContainer: {
    marginBottom: 16,
  },
  generativeContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  generativeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  generativeSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '400',
  },
 quickActionsGrid: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 24,
  },
  quickActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },modernActionCard: {
    width: (width - 88) / 2,
    marginBottom: 12,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'space-between',
  },
  actionContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  actionBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  actionBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E7EB',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontWeight: '500',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginLeft: 12,
  },
  searchForm: {
    marginBottom: 24,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modernInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputValue: {
    fontSize: 14,
    color: '#000000',
    marginLeft: 8,
    fontWeight: '500',
  },
  searchButton: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  jetResults: {
    gap: 12,
  },
  yachtResults: {
    gap: 12,
  },
  villaResults: {
    gap: 12,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  unavailableCard: {
    opacity: 0.6,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  resultCategory: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  resultStatus: {
    alignItems: 'flex-end',
  },
  availableBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  availableText: {
    fontSize: 10,
    color: '#166534',
    fontWeight: '600',
  },
  unavailableBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  unavailableText: {
    fontSize: 10,
    color: '#991B1B',
    fontWeight: '600',
  },
  yachtLocation: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  villaLocation: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  resultSpecs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  specText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  specDivider: {
    fontSize: 12,
    color: '#D1D5DB',
    marginHorizontal: 8,
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  selectIndicator: {
    padding: 4,
  },
  bookingCardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  bookingCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bookingCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  bookingBadge: {
    backgroundColor: '#000000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  bookingBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  bookingDetails: {
    marginBottom: 24,
  },
  bookingItemName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 6,
  },
  bookingItemDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  pricingBreakdown: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  priceValue: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '700',
  },
  proceedButton: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  proceedButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  paymentContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginLeft: 12,
  },
  paymentMethods: {
    marginBottom: 24,
    gap: 12,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bankIcon: {
    fontSize: 20,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  paymentMethodDesc: {
    fontSize: 12,
    color: '#6B7280',
  },
  paymentMethodCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentSummary: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  paymentSummaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  summaryTotal: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '700',
  },
  payButton: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmationContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    alignItems: 'center',
  },
  confirmationHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  confirmationTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 6,
  },
  confirmationSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  confirmationDetails: {
    width: '100%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  confirmationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  confirmationLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  confirmationValue: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
  },
  nextSteps: {
    width: '100%',
  },
  nextStepsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  stepText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  typingDots: {
    flexDirection: 'row',
    marginRight: 12,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 2,
  },
  typingText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    gap: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 15,
    maxHeight: 120,
    backgroundColor: '#F8F9FA',
    color: '#000000',
  },
  micButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sendButtonActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  preferenceForm: {
    gap: 20,
  },
  preferenceSection: {
    marginBottom: 20,
  },
  preferenceSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },
  travelStyleOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  styleOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  styleOptionSelected: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  styleOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  styleOptionTextSelected: {
    color: '#FFFFFF',
  },
  savePreferencesButton: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  savePreferencesButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  recommendationsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  recommendationsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },
  recommendationCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recommendationName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  recommendationDetails: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  recommendationPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  matchScore: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  matchScoreText: {
    fontSize: 10,
    color: '#166534',
    fontWeight: '600',
  },
  viewAllButton: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  viewAllButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});