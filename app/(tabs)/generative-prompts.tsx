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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Send, 
  Mic, 
  Plane, 
  MapPin, 
  DollarSign,
  Clock,
  Users,
  Sparkles,
  ArrowRight,
  Navigation,
  Calculator,
  Ship,
  Building2,
  Calendar,
  Star,
  CreditCard,
  Check,
  RotateCcw
} from 'lucide-react-native';
import { GoogleGenerativeAI } from '@google/generative-ai';

const { width } = Dimensions.get('window');

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GOOGLE_AI_API_KEY || '');

// AI response function for common questions with conversation context
export const getAIResponse = async (userMessage: string, conversationHistory: Message[] = []): Promise<string> => {
  try {
    console.log('Getting AI response for:', userMessage);
    console.log('API Key available:', !!process.env.EXPO_PUBLIC_GOOGLE_AI_API_KEY);
    
    // Check if API key is available
    if (!process.env.EXPO_PUBLIC_GOOGLE_AI_API_KEY) {
      console.warn('No API key found, using fallback response');
      return getLuxuryTravelResponse(userMessage, conversationHistory);
    }
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    // Build conversation context from recent messages
    const recentMessages = conversationHistory.slice(-6); // Last 6 messages for context
    const contextString = recentMessages
      .filter(msg => msg.text) // Only include messages with text
      .map(msg => `${msg.isUser ? 'User' : 'Assistant'}: ${msg.text}`)
      .join('\n');
    
    const prompt = `You are a luxury travel assistant specializing in private jets, yachts, and villa rentals. 
    You maintain conversation context and can reference previous questions and answers.
    Respond in a helpful, professional manner. Keep responses concise but comprehensive.
    Focus on luxury travel, private aviation, yacht charters, and exclusive accommodations.
    
    Previous conversation context:
    ${contextString}
    
    Current user question: ${userMessage}
    
    Provide a contextual response that considers the conversation history when relevant.`;
    
    console.log('Sending request to Gemini API with context...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('AI Response received:', text);
    return text;
  } catch (error) {
    console.error('AI Response Error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    // Fallback to custom responses with context
    return getLuxuryTravelResponse(userMessage, conversationHistory);
  }
};

// Fallback function for luxury travel responses with conversation context
export const getLuxuryTravelResponse = (userMessage: string, conversationHistory: Message[] = []): string => {
  const query = userMessage.toLowerCase();
  
  // Analyze conversation context for better responses
  const recentMessages = conversationHistory.slice(-5);
  const conversationContext = recentMessages
    .filter(msg => msg.text)
    .map(msg => msg.text?.toLowerCase() || '')
    .join(' ');
  
  // Check for follow-up questions based on context
  const hasJetContext = conversationContext.includes('jet') || conversationContext.includes('flight') || conversationContext.includes('aircraft');
  const hasYachtContext = conversationContext.includes('yacht') || conversationContext.includes('boat') || conversationContext.includes('charter');
  const hasVillaContext = conversationContext.includes('villa') || conversationContext.includes('house') || conversationContext.includes('stay');
  
  // Handle contextual follow-up questions
  if ((query.includes('what about') || query.includes('how about') || query.includes('and') || query.includes('also')) && (hasJetContext || hasYachtContext || hasVillaContext)) {
    if (hasJetContext && (query.includes('price') || query.includes('cost'))) {
      return "For private jet pricing, costs typically range from $3,000-15,000 per hour depending on aircraft size. Light jets start around $3,000/hour, midsize jets $5,000-8,000/hour, and heavy jets $8,000-15,000/hour. Additional costs include positioning, catering, and handling fees. Would you like a detailed quote for your specific route?";
    }
    if (hasYachtContext && (query.includes('price') || query.includes('cost'))) {
      return "Yacht charter pricing varies significantly by size and season. Motor yachts range from $15,000-500,000+ per week, while sailing yachts start from $8,000-300,000+ weekly. Superyachts (150ft+) typically start at $200,000 per week. Prices include crew, with fuel and expenses additional. Would you like pricing for a specific yacht category?";
    }
    if (hasVillaContext && (query.includes('price') || query.includes('cost'))) {
      return "Luxury villa pricing depends on location and amenities. Beachfront villas range from $2,000-100,000+ per night, mountain chalets $3,000-75,000+ nightly, and private islands $15,000-200,000+ per night. Prices typically include staff and basic amenities. Would you like recommendations for a specific destination?";
    }
  }
  
  // Handle follow-up questions about destinations
  if ((query.includes('where') || query.includes('destination')) && (hasJetContext || hasYachtContext || hasVillaContext)) {
    if (hasJetContext) {
      return "Our private jet services cover over 5,000 airports worldwide. Popular business routes include New York-London, Dubai-Geneva, and Los Angeles-Tokyo. For leisure, we frequently arrange flights to Monaco, Aspen, the Maldives, and St. Moritz. Where would you like to travel?";
    }
    if (hasYachtContext) {
      return "Top yacht charter destinations include the Mediterranean (French Riviera, Italian Coast, Greek Islands), Caribbean (Virgin Islands, Bahamas, St. Barts), and exotic locations like Croatia, Turkey, and Thailand. Each offers unique experiences from vibrant nightlife to secluded anchorages. Which region interests you most?";
    }
    if (hasVillaContext) {
      return "Our luxury villa portfolio spans coastal destinations (French Riviera, Caribbean, Greek Islands), mountain retreats (Swiss Alps, Aspen, Austrian Alps), and exotic locations (Maldives, Bali, Seychelles). Each destination offers world-class amenities and unique experiences. What type of setting appeals to you?";
    }
  }
  
  // Specific handling for quote breakdown prompt
  if (query.includes('break down the quote') || (query.includes('quote') && (query.includes('flight time') || query.includes('positioning') || query.includes('landing') || query.includes('handling') || query.includes('catering') || query.includes('de-icing')))) {
    return "Here's a detailed breakdown of your private jet quote:\n\n✈️ **Flight Time**: $35,000\n• 7 hours @ $5,000/hour\n• Dubai → London direct flight\n• Includes crew costs and fuel\n\n🛫 **Positioning**: $4,500\n• Aircraft repositioning to Dubai\n• Empty leg from previous location\n• Crew positioning costs\n\n🛬 **Landing Fees**: $1,200\n• Dubai departure fee: $600\n• London arrival fee: $600\n• Navigation charges included\n\n🔧 **Handling**: $2,800\n• Ground handling Dubai: $1,400\n• Ground handling London: $1,400\n• Baggage handling and aircraft services\n\n🍽️ **Catering**: $1,800\n• Premium meal service for 6 passengers\n• Champagne and fine wines\n• Special dietary accommodations\n• Fresh flowers and amenities\n\n❄️ **De-icing**: $0\n• Not required for this route/season\n• Available if weather conditions change\n\n💰 **Subtotal**: $45,300\n🏛️ **Taxes & Fees**: $2,265 (5%)\n\n**Total Quote**: $47,565\n\n*All prices in USD. Final costs may vary based on actual flight conditions, airport fees, and fuel prices at time of departure.*";
  }
  
  // Specific handling for airport and routing prompts
  if (query.includes('closest suitable airport') && query.includes('mayfair')) {
    return "For late-night arrivals to Mayfair, I recommend:\n\n🛬 **London Luton (LTN)** - 35 minutes to Mayfair\n• 24/7 operations, no curfew restrictions\n• Excellent private jet facilities\n• VIP terminal available\n\n🛬 **Farnborough (FAB)** - 45 minutes to Mayfair\n• Premium private jet airport\n• 24/7 customs and immigration\n• Luxury ground transportation arranged\n\nBoth airports offer discrete arrivals and can accommodate most aircraft types for your late-night arrival.";
  }
  
  if (query.includes('land in st. moritz') || (query.includes('st. moritz') && query.includes('alternate'))) {
    return "St. Moritz direct landing options:\n\n🏔️ **Samedan Airport (SMV)** - 5km from St. Moritz\n• Runway: 1,800m, suitable for light to midsize jets\n• Altitude: 1,707m - performance considerations required\n• Winter operations dependent on weather\n\n✈️ **Best Alternates:**\n• **Zurich (ZUR)** - 2.5 hours by helicopter/car\n• **Milan Malpensa (MXP)** - 3 hours by car\n• **Innsbruck (INN)** - 2 hours by car\n\nI recommend Samedan for smaller aircraft or Zurich + helicopter transfer for larger jets.";
  }
  
  if (query.includes('runway') && query.includes('mtow') && query.includes('mykonos')) {
    return "Mykonos Airport (JMK) specifications for midsize jets:\n\n🛬 **Runway Details:**\n• Length: 1,180m (3,871ft)\n• Width: 30m\n• Surface: Asphalt\n\n⚖️ **Weight Restrictions:**\n• MTOW limit: 20,000kg (44,092 lbs)\n• Suitable for: Citation XLS+, Hawker 800XP, Learjet 60\n• NOT suitable for: Challenger 350, Gulfstream G280\n\n🌊 **July Considerations:**\n• High density altitude affects performance\n• Strong Meltemi winds possible\n• Recommend early morning/late evening slots";
  }
  
  // Specific handling for pricing prompts
  if (query.includes('3 quotes') && query.includes('light jet') && query.includes('midsize') && query.includes('super-midsize')) {
    return "Dubai → Muscat Round Trip Quotes:\n\n🛩️ **Light Jet (Citation CJ3+)**\n• Flight time: 1.5 hours each way\n• Total cost: $18,500\n• Capacity: 6 passengers\n\n✈️ **Midsize (Hawker 800XP)**\n• Flight time: 1.3 hours each way\n• Total cost: $24,800\n• Capacity: 8 passengers\n\n🛫 **Super-Midsize (Challenger 350)**\n• Flight time: 1.2 hours each way\n• Total cost: $32,500\n• Capacity: 10 passengers\n\nAll quotes include positioning, handling, and standard catering. Prices valid for 48 hours.";
  }
  
  if (query.includes('wi-fi') && query.includes('extra') && query.includes('unlimited')) {
    return "Wi-Fi Pricing & Options:\n\n📶 **Standard Wi-Fi**: $500-800 per flight\n• Basic internet browsing\n• Email and messaging\n• Limited bandwidth\n\n🚀 **High-Speed Wi-Fi**: $1,200-1,800 per flight\n• Unlimited data\n• Video streaming capable\n• Multiple device support\n\n💎 **Premium Connectivity**: $2,000-3,000 per flight\n• Satellite-based global coverage\n• Business-grade speeds\n• Video conferencing ready\n\nMost modern aircraft include complimentary basic Wi-Fi. Upgrade costs depend on aircraft type and route.";
  }
  
  // Specific handling for Trip Intent & Discovery prompts
  if (query.includes('dubai to london') && query.includes('friday afternoon') && query.includes('6 passengers')) {
    return "Perfect! Here are your Dubai → London options for Friday afternoon (6 passengers):\n\n🛫 **Super-Midsize Options:**\n\n✈️ **Challenger 350**\n• Departure: 2:00 PM from DXB\n• Arrival: 6:30 PM at LHR\n• Flight time: 6.5 hours\n• Price: $48,500\n\n🛩️ **Citation Longitude**\n• Departure: 3:00 PM from DWC\n• Arrival: 7:30 PM at FAB\n• Flight time: 6.5 hours\n• Price: $52,000\n\n🚁 **Gulfstream G280**\n• Departure: 1:30 PM from DXB\n• Arrival: 6:00 PM at LTN\n• Flight time: 6.5 hours\n• Price: $55,800\n\nAll aircraft feature Wi-Fi, full catering, and luxury amenities. Shall I proceed with booking?";
  }
  
  if (query.includes('cost-effective') && query.includes('riyadh to paris') && query.includes('2 days')) {
    return "Most cost-effective Riyadh → Paris options (2-day trip, Sunday return):\n\n💰 **Best Value: Citation XLS+**\n• Outbound: Friday 10:00 AM\n• Return: Sunday 8:00 PM\n• Total cost: $32,500\n• Savings: $8,000 vs. larger aircraft\n\n✈️ **Comfort Option: Hawker 800XP**\n• Outbound: Friday 11:00 AM\n• Return: Sunday 7:00 PM\n• Total cost: $38,900\n• More spacious cabin\n\n🎯 **Empty Leg Special: Challenger 300**\n• Outbound: Friday 2:00 PM (empty leg)\n• Return: Sunday 6:00 PM\n• Total cost: $28,500\n• 30% savings available\n\nThe Citation XLS+ offers the best balance of cost and comfort for your 2-day trip.";
  }
  
  if (query.includes('nonstop') && query.includes('new york to dubai') && query.includes('8 people') && query.includes('10 large bags')) {
    return "New York → Dubai nonstop capability (8 pax + 10 large bags):\n\n🛫 **Ultra Long Range Required:**\n\n✈️ **Gulfstream G650ER** ⭐ RECOMMENDED\n• Range: 7,500nm (sufficient for KJFK-OMDB)\n• Capacity: 8 passengers comfortably\n• Baggage: 195 cu ft (handles 10+ large bags)\n• Flight time: 12.5 hours nonstop\n• Price: $145,000\n\n🚁 **Bombardier Global 7500**\n• Range: 7,700nm\n• Capacity: 8 passengers\n• Baggage: 195 cu ft\n• Flight time: 12.8 hours nonstop\n• Price: $155,000\n\n⚠️ **Important:** Weather and winds may require a tech stop in Europe. Both aircraft can complete this route nonstop under normal conditions.";
  }
  
  if (query.includes('quietest cabin') && query.includes('4 hours') && query.includes('milan to athens')) {
    return "Quietest cabin options for Milan → Athens (4-hour comfort focus):\n\n🔇 **Ultra-Quiet: Gulfstream G280**\n• Cabin noise: 49 dB (industry leading)\n• Advanced sound insulation\n• Flight time: 2.2 hours\n• Price: $28,500\n\n✈️ **Premium Quiet: Citation Longitude**\n• Cabin noise: 51 dB\n• Excellent acoustic design\n• Flight time: 2.3 hours\n• Price: $24,800\n\n🛩️ **Comfortable: Challenger 350**\n• Cabin noise: 52 dB\n• Spacious and well-insulated\n• Flight time: 2.1 hours\n• Price: $26,200\n\nThe Gulfstream G280 offers the quietest cabin experience, perfect for rest or confidential conversations during your flight.";
  }

  if (query.includes('shareable empty leg') && query.includes('dubai') && query.includes('riyadh')) {
    return "I found several shareable empty leg opportunities from Dubai to Riyadh this week. These flights offer significant savings as you'll be sharing the aircraft with other passengers:\n\n**Available This Week:**\n• Tuesday: Gulfstream G650 - 2 seats available\n• Thursday: Bombardier Global 6000 - 3 seats available\n• Saturday: Falcon 7X - 4 seats available\n\n**Pricing per person:**\n• Starting from $8,500 per seat\n• Includes all taxes and fees\n• Flexible timing within 2-hour windows\n\n**Benefits:**\n• 70% savings compared to charter\n• Luxury aircraft and service\n• Vetted co-passengers\n• Same-day booking available\n\nWould you like me to check availability for your preferred date and passenger count?";
  }
  
  // Enhanced yacht-specific responses
  if (query.includes('yacht') || query.includes('boat') || query.includes('sailing') || query.includes('charter')) {
    if (query.includes('price') || query.includes('cost') || query.includes('how much')) {
      return "Yacht charter pricing varies by size and season:\n\n🛥️ **Motor Yachts:**\n• 50-80ft: $15,000-35,000/week\n• 80-120ft: $40,000-85,000/week\n• 120ft+: $100,000-500,000+/week\n\n⛵ **Sailing Yachts:**\n• 40-60ft: $8,000-20,000/week\n• 60-100ft: $25,000-65,000/week\n• 100ft+: $75,000-300,000+/week\n\n💎 **Superyachts (150ft+):**\n• Starting from $200,000/week\n• Ultra-luxury: $500,000-2M+/week\n\nPrices include crew, fuel extra. Mediterranean summer and Caribbean winter are peak seasons.";
    }
    if (query.includes('destination') || query.includes('where')) {
      return "Top yacht charter destinations:\n\n🌊 **Mediterranean (May-Oct):**\n• French Riviera: Cannes, Monaco, St. Tropez\n• Italian Coast: Amalfi, Portofino, Sardinia\n• Greek Islands: Mykonos, Santorini, Corfu\n• Balearics: Ibiza, Mallorca, Menorca\n\n🏝️ **Caribbean (Dec-Apr):**\n• Leeward Islands: St. Martin, Antigua\n• Windward Islands: St. Lucia, Grenada\n• Virgin Islands: BVI, USVI\n• Bahamas: Nassau, Exumas\n\n🌴 **Other Destinations:**\n• Croatia: Dubrovnik, Split, Hvar\n• Turkey: Bodrum, Marmaris\n• Thailand: Phuket, Koh Samui\n\nEach destination offers unique experiences from vibrant nightlife to secluded anchorages.";
    }
    if (query.includes('crew') || query.includes('captain') || query.includes('service')) {
      return "Yacht crew and service details:\n\n👨‍✈️ **Professional Crew:**\n• Captain: Licensed and experienced\n• Chef: Gourmet cuisine specialist\n• Steward(ess): Hospitality expert\n• Deckhand: Water sports & maintenance\n\n🍽️ **Onboard Services:**\n• Personalized meal planning\n• Water sports equipment\n• Tender service to shore\n• Housekeeping & laundry\n\n🎯 **Additional Services:**\n• Provisioning & shopping\n• Itinerary planning\n• Shore excursion arrangements\n• Special event coordination\n\nAll crew are vetted professionals ensuring exceptional service throughout your charter.";
    }
    return "I can help you find the perfect yacht charter! Our fleet includes motor yachts, sailing yachts, and superyachts in destinations worldwide. What type of yacht experience are you looking for?";
  }

  // Enhanced villa/accommodation-specific responses
  if (query.includes('villa') || query.includes('house') || query.includes('stay') || query.includes('accommodation') || query.includes('resort')) {
    if (query.includes('price') || query.includes('cost') || query.includes('how much')) {
      return "Luxury accommodation pricing by category:\n\n🏖️ **Beachfront Villas:**\n• 3-5 bedrooms: $2,000-8,000/night\n• 6-10 bedrooms: $10,000-25,000/night\n• Ultra-luxury estates: $30,000-100,000+/night\n\n🏔️ **Mountain Chalets:**\n• Ski-in/out: $3,000-15,000/night\n• Private slopes: $20,000-50,000/night\n• Exclusive resorts: $25,000-75,000/night\n\n🏝️ **Private Islands:**\n• Boutique properties: $15,000-40,000/night\n• Full island rental: $50,000-200,000+/night\n\n🏛️ **Historic Estates:**\n• Castles & palaces: $5,000-30,000/night\n• Wine estates: $3,000-15,000/night\n\nPrices include staff, amenities vary by property.";
    }
    if (query.includes('destination') || query.includes('where')) {
      return "Premier luxury accommodation destinations:\n\n🌊 **Coastal Destinations:**\n• French Riviera: St. Tropez, Cannes, Nice\n• Italian Riviera: Portofino, Cinque Terre\n• Greek Islands: Mykonos, Santorini, Crete\n• Caribbean: Turks & Caicos, Barbados, St. Barts\n\n🏔️ **Mountain Retreats:**\n• Swiss Alps: St. Moritz, Verbier, Zermatt\n• French Alps: Courchevel, Megève, Chamonix\n• Austrian Alps: Kitzbühel, Innsbruck\n• Aspen & Vail, Colorado\n\n🏝️ **Exotic Locations:**\n• Maldives: Private island resorts\n• Seychelles: Exclusive villas\n• Bali: Luxury estates\n• Thailand: Private beach houses\n\nEach destination offers unique luxury experiences and world-class amenities.";
    }
    if (query.includes('amenities') || query.includes('features') || query.includes('service')) {
      return "Luxury villa amenities and services:\n\n🏊‍♂️ **Property Features:**\n• Infinity pools & spas\n• Private beaches or ski access\n• Wine cellars & tasting rooms\n• Home theaters & game rooms\n• Fitness centers & tennis courts\n\n👨‍🍳 **Concierge Services:**\n• Private chef & sommelier\n• Housekeeping & butler service\n• Personal trainers & spa therapists\n• Chauffeur & helicopter transfers\n\n🎯 **Exclusive Experiences:**\n• Private yacht charters\n• Helicopter tours & transfers\n• Wine tastings & cooking classes\n• Personal shopping & styling\n• Event planning & coordination\n\nAll properties include 24/7 concierge support for seamless luxury experiences.";
    }
    return "I can help you find the perfect luxury accommodation! Our portfolio includes beachfront villas, mountain chalets, private islands, and historic estates worldwide. What type of luxury stay are you seeking?";
  }

  // Enhanced contextual understanding for buying/purchasing
  if (query.includes('buy') || query.includes('purchase')) {
    if (query.includes('how to') || query.includes('how do') || query.includes('process')) {
      return "Here's how to purchase luxury travel services: 1) Contact our specialists for a consultation, 2) We'll assess your needs and budget, 3) Review curated options from our exclusive partners, 4) Complete due diligence and financing arrangements, 5) Finalize acquisition with full concierge support. Our team handles everything from private jet ownership to yacht purchases and luxury real estate.";
    }
    return "For purchasing luxury travel services, I can connect you with our exclusive partners. We offer private jet ownership programs, yacht purchases, and luxury real estate acquisitions. Would you like me to arrange a consultation with our specialists?";
  }
  
  // Enhanced price/cost responses
  if (query.includes('price') || query.includes('cost')) {
    if (query.includes('how much') || query.includes('what does')) {
      return "Luxury travel investments vary significantly: Private jet ownership ranges from $3M-$90M, yacht purchases from $500K-$500M+, and luxury villas from $1M-$100M+. Charter options are more accessible: jets from $3,000/hour, yachts from $10,000/day, villas from $1,000/night. Let me create a personalized assessment based on your specific requirements.";
    }
    return "Our luxury travel pricing varies based on your specific requirements. Private jet charters typically start from $3,000/hour, luxury yacht charters from $10,000/day, and exclusive villas from $1,000/night. Let me create a personalized quote for you.";
  }
  
  // Enhanced booking responses
  if (query.includes('book') || query.includes('reserve')) {
    if (query.includes('how to') || query.includes('process')) {
      return "Booking luxury travel is seamless with our concierge service: 1) Share your travel dates and preferences, 2) We'll present curated options within 2 hours, 3) Review and select your preferred choice, 4) We handle all arrangements and documentation, 5) Enjoy white-glove service throughout your journey. Available 24/7 for immediate bookings.";
    }
    return "I'd be delighted to help you make a reservation. Our concierge team can arrange private jets, luxury yachts, or exclusive accommodations within 24 hours. What type of luxury experience are you looking to book?";
  }
  
  // Enhanced destination responses
  if (query.includes('destination') || query.includes('where')) {
    return "We serve over 150 luxury destinations worldwide, from private islands in the Maldives to exclusive ski resorts in the Alps. Our most popular destinations include Monaco, Aspen, the French Riviera, and Dubai. Where would you like to explore?";
  }
  
  // Enhanced general responses with better context understanding
  if (query.includes('how') || query.includes('what') || query.includes('when') || query.includes('why')) {
    return "I'm here to guide you through every aspect of luxury travel. Whether you're interested in purchasing, chartering, or booking exclusive experiences, I can provide detailed processes, pricing, and personalized recommendations. What specific aspect of luxury travel would you like to explore?";
  }
  
  return "I'm your luxury travel specialist, ready to assist with private jets, yacht charters, and exclusive accommodations. Our 24/7 concierge service ensures every detail of your journey is perfectly arranged. How may I elevate your travel experience today?";
};

interface Message {
  id: string;
  text?: string;
  isUser: boolean;
  timestamp: Date;
  component?: 'quick-start' | 'jet-search' | 'yacht-search' | 'villa-search' | 'booking-card' | 'payment-flow' | 'confirmation' | 'preference-intake' | 'recommendations' | 'comparison' | 'itinerary' | 'generative-prompts' | 'trip-planner' | 'destination-explorer' | 'booking-status' | 'weather-alerts' | 'concierge-services';
  data?: any;
}

interface PromptCategory {
  title: string;
  icon: React.ComponentType<any>;
  prompts: string[];
}

export default function GenerativePromptsScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Save messages to AsyncStorage
  const saveMessages = async (messagesToSave: Message[]) => {
    try {
      await AsyncStorage.setItem('chatMessages', JSON.stringify(messagesToSave));
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  };

  // Load messages from AsyncStorage
  const loadMessages = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem('chatMessages');
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      } else {
        // Set default initial message if no saved messages
        const initialMessage: Message = {
          id: '1',
          isUser: false,
          timestamp: new Date(),
          component: 'generative-prompts',
          data: {}
        };
        setMessages([initialMessage]);
        saveMessages([initialMessage]);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      // Fallback to default message
      const initialMessage: Message = {
        id: '1',
        isUser: false,
        timestamp: new Date(),
        component: 'generative-prompts',
        data: {}
      };
      setMessages([initialMessage]);
    }
  };

  // Clear chat history
  const clearChat = async () => {
    try {
      await AsyncStorage.removeItem('chatMessages');
      const initialMessage: Message = {
        id: '1',
        isUser: false,
        timestamp: new Date(),
        component: 'generative-prompts',
        data: {}
      };
      setMessages([initialMessage]);
      saveMessages([initialMessage]);
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  useEffect(() => {
    loadMessages();

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const promptCategories: PromptCategory[] = [
    {
      title: "Trip Intent & Discovery",
      icon: Plane,
      prompts: [
        "I need a private jet from Dubai to London next Friday afternoon for 6 passengers.",
        "Suggest the most cost-effective jet from Riyadh to Paris for 2 days, returning Sunday night.",
        "What aircraft can fly nonstop from New York to Dubai with 8 people and 10 large bags?",
        "I'm flexible by one day—what's the cheapest window from Zurich to Ibiza next week?",
        "I prefer the quietest cabin for 4 hours—what would you recommend from Milan to Athens?",
        "Show me options with a stand‑up cabin and Wi‑Fi for a 5-hour flight.",
        "Which jets allow pets in cabin for a trip from LAX to Aspen this weekend?",
        "We need a medical kit and onboard oxygen—what aircraft meet that?",
        "Find eco-friendlier options or SAF availability for a flight Dubai → Geneva.",
        "Recommend aircraft with a private lavatory and enclosed aft cabin for 7 pax."
      ]
    },
    {
      title: "Airport & Routing",
      icon: Navigation,
      prompts: [
        "What is the closest suitable airport to Mayfair for a late-night arrival?",
        "Can we land in St. Moritz directly? If not, what's the best alternate?",
        "Are there runway or MTOW limits at Mykonos for midsize jets in July?",
        "Suggest routing with the fewest tech stops from Miami to Jeddah on a super-midsize.",
        "What are the slot and curfew restrictions at London City for tomorrow?",
        "Is de-icing likely in Zurich on Friday morning, and what should we budget?",
        "What are the noise restrictions at Nice for arrivals after 22:00?",
        "Which airports near Courchevel can handle our jet and luggage profile?"
      ]
    },
    {
      title: "Pricing & Quotes",
      icon: Calculator,
      prompts: [
        "Give me 3 quotes: light jet, midsize, and super-midsize Dubai → Muscat round trip.",
        "Break down the quote: flight time, positioning, landing, handling, catering, de-icing.",
        "How much extra is Wi‑Fi, and is it unlimited?",
        "What are peak day surcharges this month?",
        "Can you price shareable empty legs that align with Dubai → Riyadh this week?",
        "Compare two quotes on hourly rate, fuel surcharge, and crew overnight costs.",
        "Estimate total with a 2-hour ground hold in Paris and late-night crew duty."
      ]
    }
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const query = text.toLowerCase();
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
    setInputText('');
    setIsTyping(true);

    // Check for "how to" questions first (before simple keyword matching)
    if (query.includes('how to') || query.includes('how do') || query.includes('how can') || query.includes('how much')) {
      try {
        const aiResponse = await getAIResponse(text, messages);
        setTimeout(() => {
          setIsTyping(false);
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: aiResponse,
            isUser: false,
            timestamp: new Date(),
          };
          const newMessages = [...messages, userMessage, aiMessage];
          setMessages(newMessages);
          saveMessages(newMessages);
        }, 1500);
      } catch (error) {
        console.error('AI Response Error:', error);
        const fallbackResponse = getLuxuryTravelResponse(text, messages);
        setTimeout(() => {
          setIsTyping(false);
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: fallbackResponse,
            isUser: false,
            timestamp: new Date(),
          };
          const newMessages = [...messages, userMessage, aiMessage];
          setMessages(newMessages);
          saveMessages(newMessages);
        }, 1500);
      }
      return;
    }

    // Enhanced context detection for better AI understanding
    const isQuestion = query.includes('?') || query.includes('how') || query.includes('what') || query.includes('when') || query.includes('where') || query.includes('why') || query.includes('which') || query.includes('can you') || query.includes('tell me') || query.includes('explain');
    
    // Check for specific search keywords (prioritize search components for non-questions)
    if (!isQuestion && (query.includes('jet') || query.includes('flight') || query.includes('fly') || query.includes('private') || query.includes('aircraft'))) {
      setTimeout(() => {
        setIsTyping(false);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Perfect! I\'ll help you find the ideal private jet for your journey. Let me create a personalized search based on your requirements.',
          isUser: false,
          timestamp: new Date(),
        };
        const newMessages = [...messages, userMessage, aiMessage];
        setMessages(newMessages);
        saveMessages(newMessages);
        
        setTimeout(() => {
          const jetSearch: Message = {
            id: (Date.now() + 2).toString(),
            component: 'jet-search',
            isUser: false,
            timestamp: new Date(),
          };
          setMessages(prev => {
            const updatedMessages = [...prev, jetSearch];
            saveMessages(updatedMessages);
            return updatedMessages;
          });
        }, 1000);
      }, 1500);
      
    } else if (!isQuestion && (query.includes('yacht') || query.includes('boat') || query.includes('charter') || query.includes('sailing'))) {
      setTimeout(() => {
        setIsTyping(false);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Excellent! I\'ll help you find the perfect yacht charter. Let me create a personalized search for you.',
          isUser: false,
          timestamp: new Date(),
        };
        const newMessages = [...messages, userMessage, aiMessage];
        setMessages(newMessages);
        saveMessages(newMessages);
        
        setTimeout(() => {
          const yachtSearch: Message = {
            id: (Date.now() + 2).toString(),
            component: 'yacht-search',
            isUser: false,
            timestamp: new Date(),
          };
          setMessages(prev => {
            const updatedMessages = [...prev, yachtSearch];
            saveMessages(updatedMessages);
            return updatedMessages;
          });
        }, 1000);
      }, 1500);
      
    } else if (!isQuestion && (query.includes('villa') || query.includes('house') || query.includes('stay') || query.includes('accommodation'))) {
      setTimeout(() => {
        setIsTyping(false);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Perfect! I\'ll help you discover exclusive villas and luxury accommodations. Let me set up a custom search.',
          isUser: false,
          timestamp: new Date(),
        };
        const newMessages = [...messages, userMessage, aiMessage];
        setMessages(newMessages);
        saveMessages(newMessages);
        
        setTimeout(() => {
          const villaSearch: Message = {
            id: (Date.now() + 2).toString(),
            component: 'villa-search',
            isUser: false,
            timestamp: new Date(),
          };
          setMessages(prev => {
            const updatedMessages = [...prev, villaSearch];
            saveMessages(updatedMessages);
            return updatedMessages;
          });
        }, 1000);
      }, 1500);
      
    } else {
      // Use AI for general questions with conversation context
      try {
        const aiResponse = await getAIResponse(text, messages);
        setTimeout(() => {
          setIsTyping(false);
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: aiResponse,
            isUser: false,
            timestamp: new Date(),
          };
          const newMessages = [...messages, userMessage, aiMessage];
          setMessages(newMessages);
          saveMessages(newMessages);
        }, 1500);
      } catch (error) {
        // Enhanced fallback with context awareness
        const fallbackResponse = getLuxuryTravelResponse(text, messages);
        setTimeout(() => {
          setIsTyping(false);
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: fallbackResponse || "I'm here to help with your luxury travel needs. Could you please rephrase your question?",
            isUser: false,
            timestamp: new Date(),
          };
          const newMessages = [...messages, userMessage, aiMessage];
          setMessages(newMessages);
          saveMessages(newMessages);
        }, 1500);
      }
    }

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handlePromptSelect = (prompt: string) => {
    setInputText(prompt);
    handleSendMessage(prompt);
  };

  const renderGenerativePrompts = () => {
    return (
      <View style={styles.generativeContainer}>
        <View style={styles.titleSection}>
          <View style={styles.iconContainer}>
            <Sparkles size={24} color="#6366F1" />
          </View>
          <Text style={styles.generativeTitle}>Private Jet Assistant</Text>
          <Text style={styles.generativeSubtitle}>
            Ask me anything about private jet travel, airports, routing, and pricing
          </Text>
        </View>

        {promptCategories.map((category, categoryIndex) => {
          const IconComponent = category.icon;
          return (
            <View key={categoryIndex} style={styles.categorySection}>
              <View style={styles.categoryHeader}>
                <IconComponent size={18} color="#6366F1" />
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </View>
              <View style={styles.promptChipsContainer}>
                {category.prompts.map((prompt, promptIndex) => (
                  <TouchableOpacity
                    key={promptIndex}
                    style={styles.promptChip}
                    onPress={() => handlePromptSelect(prompt)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.promptChipText}>{prompt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}

        <View style={styles.quickStatsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>25+</Text>
            <Text style={styles.statLabel}>Sample Prompts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>
        </View>
      </View>
    );
  };

  const handleBookingSelect = (option: any) => {
    const bookingMessage: Message = {
      id: Date.now().toString(),
      component: 'booking-card',
      isUser: false,
      timestamp: new Date(),
      data: option
    };
    setMessages(prev => {
      const updatedMessages = [...prev, bookingMessage];
      saveMessages(updatedMessages);
      return updatedMessages;
    });
  };

  const renderJetSearch = () => {
    const jetOptions = [
      {
        id: '1',
        aircraft: 'Gulfstream G650',
        category: 'Ultra Long Range',
        passengers: '14-19',
        range: '7,000 nm',
        speed: '516 kts',
        price: '$8,500/hr',
        availability: 'Available',
        departure: 'Dubai (DXB)',
        arrival: 'London (LHR)',
        duration: '7h 30m',
        features: ['Wi-Fi', 'Bedroom', 'Full Kitchen']
      },
      {
        id: '2',
        aircraft: 'Bombardier Global 7500',
        category: 'Ultra Long Range',
        passengers: '12-17',
        range: '7,700 nm',
        speed: '488 kts',
        price: '$9,200/hr',
        availability: 'Available',
        departure: 'Dubai (DXB)',
        arrival: 'London (LHR)',
        duration: '7h 45m',
        features: ['Wi-Fi', 'Master Suite', 'Entertainment System']
      },
      {
        id: '3',
        aircraft: 'Dassault Falcon 8X',
        category: 'Long Range',
        passengers: '12-16',
        range: '6,450 nm',
        speed: '488 kts',
        price: '$7,800/hr',
        availability: 'Available',
        departure: 'Dubai (DXB)',
        arrival: 'London (LHR)',
        duration: '8h 15m',
        features: ['Wi-Fi', 'Spacious Cabin', 'Advanced Avionics']
      }
    ];

    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchHeader}>
          <View style={styles.searchIconContainer}>
            <Plane size={24} color="#6366F1" />
          </View>
          <Text style={styles.searchTitle}>Private Jet Options</Text>
          <Text style={styles.searchSubtitle}>Dubai → London • Friday Afternoon • 6 Passengers</Text>
        </View>

        {jetOptions.map((option, index) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionCard}
            onPress={() => handleBookingSelect(option)}
            activeOpacity={0.7}
          >
            <View style={styles.optionHeader}>
              <View style={styles.optionLeft}>
                <Text style={styles.aircraftName}>{option.aircraft}</Text>
                <Text style={styles.aircraftCategory}>{option.category}</Text>
              </View>
              <View style={styles.optionRight}>
                <Text style={styles.optionPrice}>{option.price}</Text>
                <View style={styles.availabilityBadge}>
                  <Text style={styles.availabilityText}>{option.availability}</Text>
                </View>
              </View>
            </View>

            <View style={styles.routeContainer}>
              <View style={styles.routePoint}>
                <Text style={styles.routeLocation}>{option.departure}</Text>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.routePoint}>
                <Text style={styles.routeLocation}>{option.arrival}</Text>
              </View>
              <View style={styles.durationContainer}>
                <Clock size={14} color="#6B7280" />
                <Text style={styles.durationText}>{option.duration}</Text>
              </View>
            </View>

            <View style={styles.specsContainer}>
              <View style={styles.specItem}>
                <Users size={14} color="#6B7280" />
                <Text style={styles.specText}>{option.passengers}</Text>
              </View>
              <View style={styles.specItem}>
                <MapPin size={14} color="#6B7280" />
                <Text style={styles.specText}>{option.range}</Text>
              </View>
              <View style={styles.specItem}>
                <ArrowRight size={14} color="#6B7280" />
                <Text style={styles.specText}>{option.speed}</Text>
              </View>
            </View>

            <View style={styles.featuresContainer}>
              {option.features.map((feature, featureIndex) => (
                <View key={featureIndex} style={styles.featureTag}>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.viewMoreButton} onPress={() => console.log('View More Options pressed')}>
          <Text style={styles.viewMoreText}>View More Options</Text>
          <ArrowRight size={16} color="#6366F1" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderYachtSearch = () => {
    const yachts = [
      {
        name: 'Serenity',
        category: 'Luxury Motor Yacht',
        length: '180ft',
        guests: '12 guests',
        price: '$85,000/week',
        location: 'Monaco',
        rating: 4.9,
        features: ['Jacuzzi', 'Helipad', 'Water Sports']
      },
      {
        name: 'Ocean Pearl',
        category: 'Super Yacht',
        length: '220ft',
        guests: '16 guests',
        price: '$125,000/week',
        location: 'Cannes',
        rating: 5.0,
        features: ['Cinema', 'Spa', 'Beach Club']
      },
      {
        name: 'Azure Dream',
        category: 'Explorer Yacht',
        length: '160ft',
        guests: '10 guests',
        price: '$75,000/week',
        location: 'St. Tropez',
        rating: 4.8,
        features: ['Gym', 'Wine Cellar', 'Tender Garage']
      }
    ];

    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchHeader}>
          <View style={styles.searchIconContainer}>
            <Ship size={24} color="#6366F1" />
          </View>
          <Text style={styles.searchTitle}>Yacht Charter Options</Text>
          <Text style={styles.searchSubtitle}>Mediterranean • Summer Charter</Text>
        </View>
        
        {yachts.map((yacht, index) => (
          <View key={index} style={styles.optionCard}>
            <View style={styles.optionHeader}>
              <View style={styles.optionLeft}>
                <Text style={styles.aircraftName}>{yacht.name}</Text>
                <Text style={styles.aircraftCategory}>{yacht.category}</Text>
              </View>
              <View style={styles.optionRight}>
                <Text style={styles.optionPrice}>{yacht.price}</Text>
                <View style={styles.availabilityBadge}>
                  <Text style={styles.availabilityText}>Available</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.routeContainer}>
              <View style={styles.routePoint}>
                <Text style={styles.routeLocation}>{yacht.location}</Text>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.durationContainer}>
                <Star size={12} color="#FFD700" fill="#FFD700" />
                <Text style={styles.durationText}>{yacht.rating}</Text>
              </View>
            </View>
            
            <View style={styles.specsContainer}>
              <View style={styles.specItem}>
                <Ship size={12} color="#6B7280" />
                <Text style={styles.specText}>{yacht.length}</Text>
              </View>
              <View style={styles.specItem}>
                <Users size={12} color="#6B7280" />
                <Text style={styles.specText}>{yacht.guests}</Text>
              </View>
            </View>
            
            <View style={styles.featuresContainer}>
              {yacht.features.map((feature, featureIndex) => (
                <View key={featureIndex} style={styles.featureTag}>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            
            <TouchableOpacity 
              style={styles.bookNowButton}
              onPress={() => {
                const paymentMessage = {
                  id: Date.now().toString(),
                  text: `Great choice! Let's proceed with booking the ${yacht.name}. Please review the payment details below.`,
                  isUser: false,
                  timestamp: new Date(),
                  component: 'payment-flow' as const,
                  data: { type: 'yacht', item: yacht }
                };
                
                const newMessages = [...messages, paymentMessage];
                setMessages(newMessages);
                saveMessages(newMessages);
              }}
            >
              <Text style={styles.bookNowText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  const renderVillaSearch = () => {
    const villas = [
      {
        name: 'Villa Bellavista',
        category: 'Tuscan Estate',
        bedrooms: '8 bedrooms',
        guests: '16 guests',
        price: '$4,500/night',
        location: 'Chianti Hills',
        rating: 4.9,
        features: ['Pool', 'Wine Cellar', 'Chef Service']
      },
      {
        name: 'Casa Moderna',
        category: 'Contemporary Villa',
        bedrooms: '6 bedrooms',
        guests: '12 guests',
        price: '$3,200/night',
        location: 'Florence',
        rating: 5.0,
        features: ['Spa', 'Garden', 'Art Collection']
      },
      {
        name: 'Palazzo Antico',
        category: 'Historic Palace',
        bedrooms: '10 bedrooms',
        guests: '20 guests',
        price: '$6,800/night',
        location: 'Siena',
        rating: 4.8,
        features: ['Library', 'Courtyard', 'Concierge']
      }
    ];

    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchHeader}>
          <View style={styles.searchIconContainer}>
            <Building2 size={24} color="#6366F1" />
          </View>
          <Text style={styles.searchTitle}>Luxury Villa Options</Text>
          <Text style={styles.searchSubtitle}>Exclusive Properties</Text>
        </View>
        
        {villas.map((villa, index) => (
          <View key={index} style={styles.optionCard}>
            <View style={styles.optionHeader}>
              <View style={styles.optionLeft}>
                <Text style={styles.aircraftName}>{villa.name}</Text>
                <Text style={styles.aircraftCategory}>{villa.category}</Text>
              </View>
              <View style={styles.optionRight}>
                <Text style={styles.optionPrice}>{villa.price}</Text>
                <View style={styles.availabilityBadge}>
                  <Text style={styles.availabilityText}>Available</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.routeContainer}>
              <View style={styles.routePoint}>
                <Text style={styles.routeLocation}>{villa.location}</Text>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.durationContainer}>
                <Star size={12} color="#FFD700" fill="#FFD700" />
                <Text style={styles.durationText}>{villa.rating}</Text>
              </View>
            </View>
            
            <View style={styles.specsContainer}>
              <View style={styles.specItem}>
                <Building2 size={12} color="#6B7280" />
                <Text style={styles.specText}>{villa.bedrooms}</Text>
              </View>
              <View style={styles.specItem}>
                <Users size={12} color="#6B7280" />
                <Text style={styles.specText}>{villa.guests}</Text>
              </View>
            </View>
            
            <View style={styles.featuresContainer}>
              {villa.features.map((feature, featureIndex) => (
                <View key={featureIndex} style={styles.featureTag}>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            
            <TouchableOpacity 
              style={styles.bookNowButton}
              onPress={() => {
                const paymentMessage = {
                  id: Date.now().toString(),
                  text: `Excellent selection! Let's proceed with booking ${villa.name}. Please review the payment details below.`,
                  isUser: false,
                  timestamp: new Date(),
                  component: 'payment-flow' as const,
                  data: { type: 'villa', item: villa }
                };
                
                const newMessages = [...messages, paymentMessage];
                setMessages(newMessages);
                saveMessages(newMessages);
              }}
            >
              <Text style={styles.bookNowText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  const renderBookingCard = (data: any) => {
    return (
      <View style={styles.bookingContainer}>
        <View style={styles.bookingHeader}>
          <Text style={styles.bookingTitle}>Selected Aircraft</Text>
          <View style={styles.bookingBadge}>
            <Check size={16} color="#10B981" />
            <Text style={styles.bookingBadgeText}>Available</Text>
          </View>
        </View>
        
        <View style={styles.bookingCard}>
          <Text style={styles.bookingAircraft}>{data.aircraft}</Text>
          <Text style={styles.bookingCategory}>{data.category}</Text>
          
          <View style={styles.bookingRoute}>
            <Text style={styles.bookingLocation}>{data.departure}</Text>
            <ArrowRight size={16} color="#6B7280" />
            <Text style={styles.bookingLocation}>{data.arrival}</Text>
          </View>
          
          <View style={styles.bookingDetails}>
            <View style={styles.bookingDetailItem}>
              <Text style={styles.bookingDetailLabel}>Duration</Text>
              <Text style={styles.bookingDetailValue}>{data.duration}</Text>
            </View>
            <View style={styles.bookingDetailItem}>
              <Text style={styles.bookingDetailLabel}>Passengers</Text>
              <Text style={styles.bookingDetailValue}>{data.passengers}</Text>
            </View>
            <View style={styles.bookingDetailItem}>
              <Text style={styles.bookingDetailLabel}>Price</Text>
              <Text style={styles.bookingDetailValue}>{data.price}</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.bookNowButton}
          onPress={() => {
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
              data: data,
            };
            
            const updatedMessages = [...messages, paymentMessage, paymentFlow];
            setMessages(updatedMessages);
            saveMessages(updatedMessages);
          }}
        >
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderPaymentFlow = (data: any) => {
    return (
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
            <Text style={styles.summaryLabel}>{data.aircraft || data.name}</Text>
            <Text style={styles.summaryValue}>{data.price}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service Fee</Text>
            <Text style={styles.summaryValue}>$3,700</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.summaryLabel}>Total Amount</Text>
            <Text style={styles.summaryTotal}>
              ${(parseInt(data.price?.replace(/[^0-9]/g, '') || '0') + 3700).toLocaleString()}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.payButton}
          onPress={() => {
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
              data: data,
            };
            
            const updatedMessages = [...messages, confirmationMessage, confirmation];
            setMessages(updatedMessages);
            saveMessages(updatedMessages);
          }}
        >
          <Text style={styles.payButtonText}>Complete Booking</Text>
          <Check size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderConfirmation = (data: any) => {
    return (
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
            <Text style={styles.confirmationValue}>{data.aircraft || data.name || 'Luxury Service'}</Text>
          </View>
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Total Paid</Text>
            <Text style={styles.confirmationValue}>
              ${(parseInt(data.price?.replace(/[^0-9]/g, '') || '0') + 3700).toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.nextSteps}>
          <Text style={styles.nextStepsTitle}>What's Next?</Text>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>You'll receive a confirmation email within 5 minutes</Text>
          </View>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>Our concierge will contact you within 24 hours</Text>
          </View>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>Enjoy your luxury experience!</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderMessageComponent = (message: Message) => {
    switch (message.component) {
      case 'quick-start':
        return renderGenerativePrompts();
      case 'jet-search':
        return renderJetSearch();
      case 'yacht-search':
        return renderYachtSearch();
      case 'villa-search':
        return renderVillaSearch();
      case 'booking-card':
        return renderBookingCard(message.data);
      case 'payment-flow':
        return renderPaymentFlow(message.data);
      case 'confirmation':
        return renderConfirmation(message.data);
      case 'generative-prompts':
        return renderGenerativePrompts();
      default:
        return null;
    }
  };

  const renderMessage = (message: Message) => {
    if (message.component) {
      return (
        <Animated.View 
          key={message.id} 
          style={[styles.componentContainer, { opacity: fadeAnim }]}
        >
          {renderMessageComponent(message)}
        </Animated.View>
      );
    }

    return (
      <Animated.View
        key={message.id}
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
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </Animated.View>
    );
  };

  const renderTypingIndicator = () => {
    if (!isTyping) return null;

    return (
      <View style={[styles.messageContainer, styles.aiMessage]}>
        <View style={styles.typingContainer}>
          <View style={styles.typingDot} />
          <View style={[styles.typingDot, styles.typingDotDelay1]} />
          <View style={[styles.typingDot, styles.typingDotDelay2]} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View style={styles.aiAvatar}>
                <Sparkles size={20} color="#6366F1" />
              </View>
              <View>
                <Text style={styles.headerTitle}>Private Jet AI</Text>
                <View style={styles.statusContainer}>
                  <View style={styles.onlineIndicator} />
                  <Text style={styles.statusText}>Online</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.headerAction} onPress={clearChat}>
              <RotateCcw size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(renderMessage)}
          {renderTypingIndicator()}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask about private jets, airports, or pricing..."
            placeholderTextColor="#9CA3AF"
            multiline
            maxLength={500}
          />
          {inputText.trim() ? (
            <TouchableOpacity
              style={[styles.sendButton, styles.sendButtonActive]}
              onPress={() => handleSendMessage(inputText)}
            >
              <Send size={18} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.micButton}>
              <Mic size={18} color="#6B7280" />
            </TouchableOpacity>
          )}
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
    marginBottom: 32,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  generativeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  generativeSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 20,
  },
  categorySection: {
    marginBottom: 28,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginLeft: 8,
  },
  promptChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  promptChip: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    maxWidth: '100%',
    marginBottom: 8,
  },
  promptChipText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
    lineHeight: 18,
  },
  quickStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 24,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
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
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9CA3AF',
  },
  typingDotDelay1: {
    backgroundColor: '#6B7280',
  },
  typingDotDelay2: {
    backgroundColor: '#4B5563',
  },
  // Search Results Styles
  searchContainer: {
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
  searchHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  searchIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  searchSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  optionCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  optionLeft: {
    flex: 1,
  },
  aircraftName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  aircraftCategory: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  optionRight: {
    alignItems: 'flex-end',
  },
  optionPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  availabilityBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  availabilityText: {
    fontSize: 12,
    color: '#065F46',
    fontWeight: '600',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  routePoint: {
    flex: 1,
  },
  routeLocation: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  routeLine: {
    height: 1,
    backgroundColor: '#D1D5DB',
    flex: 2,
    marginHorizontal: 12,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  durationText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  specsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureTag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featureText: {
    fontSize: 11,
    color: '#4338CA',
    fontWeight: '500',
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 8,
  },
  viewMoreText: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
    marginRight: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 40,
  },
  // Booking Card Styles
  bookingContainer: {
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
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  bookingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  bookingBadgeText: {
    fontSize: 12,
    color: '#065F46',
    fontWeight: '600',
    marginLeft: 4,
  },
  bookingCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  bookingAircraft: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  bookingCategory: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  bookingRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  bookingLocation: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginHorizontal: 12,
  },
  bookingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookingDetailItem: {
    alignItems: 'center',
  },
  bookingDetailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  bookingDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  bookNowButton: {
    backgroundColor: '#000000',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookNowText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Payment Flow Styles
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
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
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
  // Confirmation Styles
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
  },
  confirmationHeader: {
    alignItems: 'center',
    marginBottom: 32,
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
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  confirmationSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  confirmationDetails: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  confirmationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  confirmationLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  confirmationValue: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
  },
  nextSteps: {
    marginTop: 8,
  },
  nextStepsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    marginTop: 2,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});