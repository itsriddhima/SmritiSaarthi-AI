/**
 * Unified Demo Data & Multilingual AI Knowledge Base for SmritiSaarthi AI
 * Includes full translations for Assamese, Hindi, Bengali, English, Bodo, and Manipuri across:
 * - All 7 Cognitive Activities & Difficulty Levels
 * - Cherished Family Memories & Stories
 * - Daily Care & Medication Reminders
 * - Conversational NLP Intents & Dialogue
 * - UI Strings & Dictionaries
 */

export const DEMO = {
  patient: {
    id: 1,
    name: "Aita Devi",
    preferred_name: "Aita",
    namesByLang: {
      Assamese: "আইতা দেৱী (Aita Devi)",
      Hindi: "दादी देवी (Aita Devi)",
      Bengali: "আইতা দেবী (Aita Devi)",
      English: "Aita Devi",
      Bodo: "आबौ देवि (Aita Devi)",
      Manipuri: "আইতা দেবী (Aita Devi)",
    },
    preferredNamesByLang: {
      Assamese: "আইতা",
      Hindi: "दादी जी",
      Bengali: "ঠাকুমা",
      English: "Aita",
      Bodo: "आबौ",
      Manipuri: "ইবেন",
    },
    age: 74,
    gender: "Female",
    location: "Guwahati, Assam",
    languages: ["Assamese", "Hindi", "Bengali", "English", "Bodo", "Manipuri"],
    preferred_language: "Assamese",
    status: "needs_attention",
    diagnosis: "Early-stage Alzheimer's / Amnestic Mild Cognitive Impairment (aMCI)",
    emergency_contact: {
      name: "Raj (Son)",
      phone: "+91 98540 98765",
      relation: "Primary Family Contact",
    },
  },

  family: [
    {
      id: 1,
      name: "Raj",
      relation: "Son",
      emoji: "🧑🏽",
      relationsByLang: {
        Assamese: "ল'ৰা (Son)",
        Hindi: "बेटा (Son)",
        Bengali: "ছেলে (Son)",
        English: "Son",
        Bodo: "फिसा (Son)",
        Manipuri: "মচানুপা (Son)",
      },
      recognition_confidence: 94,
      short_bio: "Your loving son who works in Guwahati. He visits every evening with fresh tea biscuits.",
    },
    {
      id: 2,
      name: "Riya",
      relation: "Granddaughter",
      emoji: "👧🏽",
      relationsByLang: {
        Assamese: "নাতিনী (Granddaughter)",
        Hindi: "पोती (Granddaughter)",
        Bengali: "নাতনি (Granddaughter)",
        English: "Granddaughter",
        Bodo: "फिसौजो (Granddaughter)",
        Manipuri: "মশুনুপী (Granddaughter)",
      },
      recognition_confidence: 96,
      short_bio: "Your bright 12-year-old granddaughter who visits during Bihu and decorated your veranda with marigolds.",
    },
    {
      id: 3,
      name: "Ananya",
      relation: "Daughter-in-law",
      emoji: "👩🏽",
      relationsByLang: {
        Assamese: "বোৱাৰী (Daughter-in-law)",
        Hindi: "बहू (Daughter-in-law)",
        Bengali: "বৌমা (Daughter-in-law)",
        English: "Daughter-in-law",
        Bodo: "बिहामजो (Daughter-in-law)",
        Manipuri: "মৌনুপী (Daughter-in-law)",
      },
      recognition_confidence: 88,
      short_bio: "Your caring daughter-in-law who cooks warm khar, prepares morning Assam tea, and helps with daily medicines.",
    },
    {
      id: 4,
      name: "Pranab",
      relation: "Late Husband",
      emoji: "👴🏽",
      relationsByLang: {
        Assamese: "স্বামী (Late Husband)",
        Hindi: "पति (Late Husband)",
        Bengali: "স্বামী (Late Husband)",
        English: "Late Husband",
        Bodo: "गोजৌ हौवा (Husband)",
        Manipuri: "মপুরোইবা (Husband)",
      },
      recognition_confidence: 98,
      short_bio: "Your beloved husband of 48 years. You both shared boat rides across the Brahmaputra River to Umananda temple.",
    },
    {
      id: 5,
      name: "Kakoli",
      relation: "Sister",
      emoji: "👵🏽",
      relationsByLang: {
        Assamese: "ভনী (Sister)",
        Hindi: "बहन (Sister)",
        Bengali: "বোন (Sister)",
        English: "Sister",
        Bodo: "बिब'-बिनानाव (Sister)",
        Manipuri: "ইচল (Sister)",
      },
      recognition_confidence: 84,
      short_bio: "Your younger sister in Jorhat who calls every Sunday morning to exchange traditional pitha recipes.",
    },
  ],

  // --- Multilingual Cherished Memories ---
  memoriesByLang: {
    Assamese: [
      {
        id: 1,
        title: "বাৰাণ্ডাত ৰঙালী বিহু",
        date_label: "এপ্ৰিল ২০২৪",
        place: "গুৱাহাটী বাৰাণ্ডা",
        emoji: "🌸",
        description: "নাতিনী ৰীয়াই ৰঙা-ফুলাম মেখেলা চাদৰ পিন্ধি বিহু নাচিছিল আৰু বাৰাণ্ডাৰ ৰেলিংডালত হালধীয়া নাৰ্জী ফুলৰ মালা আঁৰি দিছিল।",
      },
      {
        id: 2,
        title: "উমানন্দ দ্বীপৰ ফেৰী যাত্ৰা",
        date_label: "শীতকাল ২০১৮",
        place: "ব্ৰহ্মপুত্ৰ নদী, গুৱাহাটী",
        emoji: "⛵",
        description: "প্ৰণৱৰ লগত নীলা ব্ৰহ্মপুত্ৰৰ বুকুৰে শান্ত পুৱাৰ ফেৰী যাত্ৰা, কুঁৱলীৰ মাজত শিহু ওপঙি উঠা চোৱাৰ অনুপম দৃশ্য।",
      },
      {
        id: 3,
        title: "মাজুলীৰ মুখাশিল্প আৰু মৃৎশিল্প",
        date_label: "শৰৎকাল ২০১৫",
        place: "মাজুলী নদী দ্বীপ",
        emoji: "🎭",
        description: "নতুন চামগুৰি সত্ৰত শিল্পীসকলৰ লগত বাঁহ আৰু মাটিৰে পৰম্পৰাগত ভাওনাৰ মুখা সজাৰ আনন্দময় দিন।",
      },
      {
        id: 4,
        title: "শুৱালকুছিৰ সোণালী মুগা বয়ন",
        date_label: "বসন্তকাল ২০১০",
        place: "শুৱালকুছি, অসম",
        emoji: "🧵",
        description: "শুৱালকুছিৰ শিপিনীসকলৰ তাঁতশাল চাই পৰিয়ালৰ বিশেষ উৎসৱৰ বাবে চকচকীয়া প্ৰাকৃতিক সোণালী মুগা চাদৰ বাছনি কৰা।",
      },
    ],
    Hindi: [
      {
        id: 1,
        title: "बालकनी में रोंगाली बिहू उत्सव",
        date_label: "अप्रैल 2024",
        place: "गुवाहाटी बालकनी",
        emoji: "🌸",
        description: "पोती रिया ने लाल और सुनहरी मेखेला चादर पहनकर बिहू नृत्य किया और बालकनी पर गेंदे के फूलों की सुंदर मालाएँ सजाईं।",
      },
      {
        id: 2,
        title: "उमानंद द्वीप की नौका यात्रा",
        date_label: "सर्दी 2018",
        place: "ब्रह्मपुत्र नदी, गुवाहाटी",
        emoji: "⛵",
        description: "प्रणब जी के साथ ब्रह्मपुत्र नदी पर सुबह की शांत नाव यात्रा, जहाँ सुबह के कोहरे में नदी की डॉल्फ़िन दिखी थीं।",
      },
      {
        id: 3,
        title: "माजुली द्वीप का मुखौटा शिल्प",
        date_label: "शरद 2015",
        place: "माजुली द्वीप",
        emoji: "🎭",
        description: "सामगुरी सत्र में कारीगरों के साथ बांस और मिट्टी से पारंपरिक मुखौटे बनाने का यादगार अनुभव।",
      },
      {
        id: 4,
        title: "सुआलकुची का सुनहरा मूंगा सिल्क",
        date_label: "बसंत 2010",
        place: "सुआलकुची, असम",
        emoji: "🧵",
        description: "सुआलकुची में बुनकरों के पास जाकर पारिवारिक उत्सव के लिए प्राकृतिक सुनहरी मूंगा रेशम चादर पसंद करना।",
      },
    ],
    Bengali: [
      {
        id: 1,
        title: "বারান্দায় রঙালী বিহু উৎসব",
        date_label: "এপ্রিল ২০২৪",
        place: "গুয়াহাটি বারান্দা",
        emoji: "🌸",
        description: "নাতনি রিয়া লাল-সোনালী মেখেলা চাদর পরে বিহু নাচ করেছিল এবং কাঠের বারান্দায় গাঁদা ফুলের সুন্দর মালা ঝুলিয়েছিল।",
      },
      {
        id: 2,
        title: "উমানন্দ দ্বীপের শান্ত নৌভ্রমণ",
        date_label: "শীতকাল ২০১৮",
        place: "ব্রহ্মপুত্র নদ, গুয়াহাটি",
        emoji: "⛵",
        description: "প্রণবের সাথে ব্রহ্মপুত্রের বুকে সকালের শান্ত ফেরি যাত্রা এবং কুয়াশার মধ্যে নদীর শুশুক ভেসে ওঠার অপরূপ দৃশ্য।",
      },
      {
        id: 3,
        title: "মাজুলীর ঐতিহ্যবাহী মুখোশ শিল্প",
        date_label: "শরৎকাল ২০১৫",
        place: "মাজুলী দ্বীপ",
        emoji: "🎭",
        description: "সামগুড়ি সত্রে কারিগরদের সাথে বাঁশ ও মাটি দিয়ে ভাওনার ঐতিহ্যবাহী মুখোশ তৈরির সুন্দর স্মৃতি।",
      },
      {
        id: 4,
        title: "শুয়ালকুচির সোনালী মুগা সিল্ক",
        date_label: "বসন্তকাল ২০১০",
        place: "শুয়ালকুচি, আসাম",
        emoji: "🧵",
        description: "শুয়ালকুচিতে তাঁতিদের কাছে গিয়ে পারিবারিক শুভ অনুষ্ঠানের জন্য খাঁটি সোনালী মুগা সিল্ক বাছাই করা।",
      },
    ],
    English: [
      {
        id: 1,
        title: "Rongali Bihu on the Veranda",
        date_label: "April 2024",
        place: "Guwahati Veranda",
        emoji: "🌸",
        description: "Granddaughter Riya wore a red and cream mekhela chador, danced Bihu, and strung yellow marigold garlands across the wooden railing.",
      },
      {
        id: 2,
        title: "Umananda Island Ferry Crossing",
        date_label: "Winter 2018",
        place: "Brahmaputra River, Guwahati",
        emoji: "⛵",
        description: "A peaceful morning ferry ride across the blue Brahmaputra River with Pranab, watching river dolphins leap in the morning mist.",
      },
      {
        id: 3,
        title: "Majuli Pottery & Mask Workshop",
        date_label: "Autumn 2015",
        place: "Majuli River Island",
        emoji: "🎭",
        description: "Crafting traditional clay and bamboo theatre masks at Samaguri Satra with master artisans.",
      },
      {
        id: 4,
        title: "Golden Muga Silk Weaving Day",
        date_label: "Spring 2010",
        place: "Sualkuchi, Assam",
        emoji: "🧵",
        description: "Visiting the master weavers in Sualkuchi and selecting natural golden silk for your special family celebrations.",
      },
    ],
    Bodo: [
      {
        id: 1,
        title: "बारान्दायाव रोंगाली बैसागु",
        date_label: "एफ्रिल 2024",
        place: "गुवाहाटी बारान्दा",
        emoji: "🌸",
        description: "फिसौजो रियाया गोजा दखना गाननानै बैसागु मोसानाय आरो गोजोनै मोखां मोखां गोजा बिबार फाननाय।",
      },
      {
        id: 2,
        title: "उमानन्द दिबनि नावै दावबायनाय",
        date_label: "गोसोम 2018",
        place: "ब्रह्मपुत्र दैमा",
        emoji: "⛵",
        description: "प्रणबजों लोगोसे ब्रह्मपुत्र दैमायाव फुंनि समाव गोजोनै नावै दावबायनाय समाव समाव दैमा जासि नुनाय।",
      },
      {
        id: 3,
        title: "माजुलीनि बां मोखां बानायनाय",
        date_label: "अटम 2015",
        place: "माजुली दिब",
        emoji: "🎭",
        description: "माजुलीयाव ओँवा आरो हाजों बानायनाय मुखा बानायनायनि साबसिन गोसोखांथि।",
      },
      {
        id: 4,
        title: "सुवालकुचिनि मुगा रेशम",
        date_label: "स्प्रिं 2010",
        place: "सुवालकुचि, आसाम",
        emoji: "🧵",
        description: "सुवालकुचिनि दानाय-लुनाय नुनानै नखरनि थाखाय मुगा रेशम दखना सायख'नाय।",
      },
    ],
    Manipuri: [
      {
        id: 1,
        title: "ভেরােন্দাদা রোঙ্গালী বিহু কুহ্মৈ",
        date_label: "এপ্রিল ২০২৪",
        place: "গুৱাহাটী ভেরােন্দা",
        emoji: "🌸",
        description: "মশুনুপী রিয়ানা বিহু জগোই শাবা অমসুং লৈ কূমৈনা ভেরােন্দাদা লৈ পরেং শেৎপা।",
      },
      {
        id: 2,
        title: "উমানন্দ ঈথৎতা হি তোংবা",
        date_label: "নীংথৌ ২০১৮",
        place: "ব্রহ্মপুত্র তুরেল",
        emoji: "⛵",
        description: "প্রণবগা লোয়ননা ব্রহ্মপুত্র তুরেলদা অয়ুক্কী মতমদা হী তোংবা অমসুং তুরেলগী ঙা উবা ফংবা।",
      },
      {
        id: 3,
        title: "মাজুলীদা সমগুড়ী সত্রদা মমী শাবা",
        date_label: "২০১৫",
        place: "মাজুলী ঈথৎ",
        emoji: "🎭",
        description: "মাজুলীদা ৱা অমসুং লৈবাক্কী শমব্রু মমী শাবা মহৈতমখিবা।",
      },
      {
        id: 4,
        title: "সুৱালকুচিদা মুগা ফী শাবা য়েংবা",
        date_label: "২০১০",
        place: "সুৱালকুচি, আসাম",
        emoji: "🧵",
        description: "সুৱালকুচিদা মুগা ফী শাবা য়েংদুনা ইমুংগী মমল য়াম্লবা ফী খলহনখিবা।",
      },
    ],
  },

  get memories() {
    return this.memoriesByLang["Assamese"];
  },

  // --- Multilingual Reminders ---
  remindersByLang: {
    Assamese: [
      {
        id: 1,
        title: "পুৱাৰ ৰক্তচাপ আৰু স্মৃতিশক্তিৰ ঔষধ",
        time_label: "০৮:৩০ AM",
        dosage_or_detail: "১ টা টেবলেট এমলোডিপাইন (5mg) + ১ টা ডনেপেজিল (5mg) গৰম আহাৰৰ পিছত",
        is_completed: true,
        priority: "high",
        icon: "💊",
      },
      {
        id: 2,
        title: "তুলসী আৰু কুহুমীয়া পানী সেৱন",
        time_label: "১১:০০ AM",
        dosage_or_detail: "১ গিলাচ পাতল কুহুমীয়া পানী তুলসী পাতৰ সৈতে",
        is_completed: false,
        priority: "normal",
        icon: "🍵",
      },
      {
        id: 3,
        title: "আবেলি বাৰাণ্ডাত শান্ত খোজকাঢ়া",
        time_label: "০৪:৩০ PM",
        dosage_or_detail: "ৰীয়া বা অনন্যাৰ লগত ১৫ মিনিট বাৰাণ্ডাত মিঠা ৰ'দত খোজকাঢ়ক",
        is_completed: false,
        priority: "normal",
        icon: "🚶🏽‍♀️",
      },
      {
        id: 4,
        title: "ৰাতিৰ আহাৰৰ পিছৰ মাল্টিভিটামিন",
        time_label: "০৮:৪৫ PM",
        dosage_or_detail: "১ চামুচ পৰিপূৰক আৰু একাপ গৰম গাখীৰ",
        is_completed: false,
        priority: "normal",
        icon: "🥛",
      },
    ],
    Hindi: [
      {
        id: 1,
        title: "सुबह की ब्लड प्रेशर और याददाश्त की दवा",
        time_label: "08:30 AM",
        dosage_or_detail: "1 गोली एम्लोडिपिन (5mg) + 1 गोली डोनेपेजिल (5mg) नाश्ते के बाद",
        is_completed: true,
        priority: "high",
        icon: "💊",
      },
      {
        id: 2,
        title: "तुलसी युक्त हल्का गुनगुना पानी",
        time_label: "11:00 AM",
        dosage_or_detail: "1 गिलास ताजा गुनगुना पानी तुलसी पत्ती के साथ",
        is_completed: false,
        priority: "normal",
        icon: "🍵",
      },
      {
        id: 3,
        title: "शाम को बालकनी में सुखद टहलना",
        time_label: "04:30 PM",
        dosage_or_detail: "रिया या अनन्या के साथ 15 मिनट हल्की धूप में टहलें",
        is_completed: false,
        priority: "normal",
        icon: "🚶🏽‍♀️",
      },
      {
        id: 4,
        title: "रात के खाने के बाद मल्टीविटामिन",
        time_label: "08:45 PM",
        dosage_or_detail: "1 चम्मच सप्लीमेंट और एक कप गुनगुना दूध",
        is_completed: false,
        priority: "normal",
        icon: "🥛",
      },
    ],
    Bengali: [
      {
        id: 1,
        title: "সকালের রক্তচাপ ও স্মৃতিশক্তির ওষুধ",
        time_label: "০৮:৩০ AM",
        dosage_or_detail: "১টি ট্যাবলেট অ্যামলোডিপিন (5mg) + ১টি ডনেপেজিল (5mg) জলখাবারের পর",
        is_completed: true,
        priority: "high",
        icon: "💊",
      },
      {
        id: 2,
        title: "তুলসী ও হালকা গরম জল পান",
        time_label: "১১:০০ AM",
        dosage_or_detail: "১ গ্লাস পরিষ্কার হালকা গরম জল তুলসী পাতা সহযোগে",
        is_completed: false,
        priority: "normal",
        icon: "🍵",
      },
      {
        id: 3,
        title: "বিকালে বারান্দায় শান্ত পদচারণা",
        time_label: "০৪:৩০ PM",
        dosage_or_detail: "রিয়া বা অনন্যার সাথে ১৫ মিনিট বারান্দায় হালকা রোদে হাঁটুন",
        is_completed: false,
        priority: "normal",
        icon: "🚶🏽‍♀️",
      },
      {
        id: 4,
        title: "রাতের খাবারের পর মাল্টিভিটামিন",
        time_label: "০৮:৪৫ PM",
        dosage_or_detail: "১ চামচ সাপ্লিমেন্ট এবং এক কাপ হালকা গরম দুধ",
        is_completed: false,
        priority: "normal",
        icon: "🥛",
      },
    ],
    English: [
      {
        id: 1,
        title: "Morning Blood Pressure & Memory Meds",
        time_label: "08:30 AM",
        dosage_or_detail: "1 tablet Amlodipine (5mg) + 1 tablet Donepezil (5mg) after warm breakfast",
        is_completed: true,
        priority: "high",
        icon: "💊",
      },
      {
        id: 2,
        title: "Warm Water & Tulsi Hydration",
        time_label: "11:00 AM",
        dosage_or_detail: "1 glass warm water with fresh tulsi leaf",
        is_completed: false,
        priority: "normal",
        icon: "🍵",
      },
      {
        id: 3,
        title: "Gentle Veranda Stroll",
        time_label: "04:30 PM",
        dosage_or_detail: "15 minutes peaceful stroll on the sunny veranda with Riya or Ananya",
        is_completed: false,
        priority: "normal",
        icon: "🚶🏽‍♀️",
      },
      {
        id: 4,
        title: "Evening Post-Dinner Multivitamin",
        time_label: "08:45 PM",
        dosage_or_detail: "1 spoonful nutritional supplement with warm milk",
        is_completed: false,
        priority: "normal",
        icon: "🥛",
      },
    ],
    Bodo: [
      {
        id: 1,
        title: "फुंनि थिख्लार आरो गोसोखांथि मुलि",
        time_label: "08:30 AM",
        dosage_or_detail: "1 टा एमलोडिपिन + 1 टा डनेपेजिल फुंनि जाखांनानै",
        is_completed: true,
        priority: "high",
        icon: "💊",
      },
      {
        id: 2,
        title: "तुलसीजों गुदुं दै लोंनाय",
        time_label: "11:00 AM",
        dosage_or_detail: "1 ग्लास गुदुं दै तुलसी बिलाइजों लोगोसे",
        is_completed: false,
        priority: "normal",
        icon: "🍵",
      },
      {
        id: 3,
        title: "बेलासियाव बारान्दायाव दावबायनाय",
        time_label: "04:30 PM",
        dosage_or_detail: "रियाजों लोगोसे 15 मिनिट बारान्दायाव सानदुं लोंनानै दावबाय",
        is_completed: false,
        priority: "normal",
        icon: "🚶🏽‍♀️",
      },
      {
        id: 4,
        title: "हरनि जाखांनानै मुलि लोंनाय",
        time_label: "08:45 PM",
        dosage_or_detail: "गुदुं गायखेरजों लोगोसे मुलि लोंनाय",
        is_completed: false,
        priority: "normal",
        icon: "🥛",
      },
    ],
    Manipuri: [
      {
        id: 1,
        title: "অয়ুক্কী ঈ-হৌবা অমসুং নীংশিং হিদাক",
        time_label: "08:30 AM",
        dosage_or_detail: "হিদাক টেবলিত ১ চাক চাবা লোইরগা থোকপা",
        is_completed: true,
        priority: "high",
        icon: "💊",
      },
      {
        id: 2,
        title: "তুলসীগা ঈশিং পীক্না থকপা",
        time_label: "11:00 AM",
        dosage_or_detail: "ঈশিং গ্লাস ১ তুলসী মনাগা লোয়ননা থকপা",
        is_completed: false,
        priority: "normal",
        icon: "🍵",
      },
      {
        id: 3,
        title: "নুমিদাংদা ভেরােন্দাদা চত্থোক-চৎশিন",
        time_label: "04:30 PM",
        dosage_or_detail: "মশুনুপী রিয়াগা লোয়ননা মিনিত ১৫ চৎপা",
        is_completed: false,
        priority: "normal",
        icon: "🚶🏽‍♀️",
      },
      {
        id: 4,
        title: "নুমিদাং চাক চাবা লোইরগা হিদাক",
        time_label: "08:45 PM",
        dosage_or_detail: "শংগোম অশাংবা অমসুং হিদাক টেবলিত ১",
        is_completed: false,
        priority: "normal",
        icon: "🥛",
      },
    ],
  },

  get reminders() {
    return this.remindersByLang["Assamese"];
  },

  // --- UI Translation Dictionary for all screens & games ---
  i18n: {
    Assamese: {
      back: "উভতি যাওক",
      backToGames: "খেলৰ তালিকালৈ উভতি যাওক",
      done: "সম্পন্ন হ'ল ✓",
      markDone: "সম্পন্ন বুলি চিন দিয়ক",
      snooze: "১৫ মিনিট পিছুৱাওক",
      tapToListen: "🔊 শুনক",
      tapToSpeak: "কথা ক'বলৈ টেপ কৰক",
      tapToListenAgain: "🔊 পুনৰ শুনক",
      typePlaceholder: "স্মৃতিসাৰথীলৈ বাৰ্তা লিখক...",
      send: "প্ৰেৰণ কৰক",
      listening: "মন দি শুনি আছো... কওক",
      saathiSpeaking: "স্মৃতিসাৰথীয়ে কথা কৈ আছে...",
      askHint: "💡 স্মৃতিসাৰথীক এটা সহজ আভাস বিচাৰক",
      hintTitle: "স্মৃতিসাৰথীৰ আভাস:",
      question: "প্ৰশ্ন",
      of: "ৰ ভিতৰত",
      allPairsMatched: "🎉 সকলোযোৰ কাৰ্ড মিলিল! বৰ ধুনীয়া!",
      photoRestored: "✨ ছবিখন সম্পূৰ্ণ হ'ল!",
      soundPrompt: "🔊 শব্দ বজাবলৈ টেপ কৰক",
      gardenTitle: "আপোনাৰ সোণালী স্মৃতি বাগিচা",
      gardenLevel: "স্তৰ",
      gardenSub: "প্ৰতিটো স্মৃতি আৰু অনুশীলনৰ লগে লগে এই বাগিচা ফুলি উঠে।",
      aiDifficulty: "AI অসুবিধা স্তৰ:",
      gentle: "কোমল",
      standard: "মান্য",
      focus: "গভীৰ",
      step: "পদক্ষেপ",
      remindersTitle: "দৈনন্দিন যত্ন আৰু ঔষধৰ সময়সূচী",
      remindersSub: "সম্পন্ন হ'লে 'সম্পন্ন' টেপ কৰক বা শুনক:",
      memoriesTitle: "মোৰ সোণালী স্মৃতিসমূহ",
      playTitle: "স্মৃতি খেল আৰু অনুশীলন",
    },
    Hindi: {
      back: "वापस जाएँ",
      backToGames: "खेलों की सूची पर वापस",
      done: "पूर्ण हुआ ✓",
      markDone: "हो गया पर टिक करें",
      snooze: "15 मिनट बाद याद दिलाएँ",
      tapToListen: "🔊 सुनें",
      tapToSpeak: "बोलने के लिए दबाएँ",
      tapToListenAgain: "🔊 दोबारा सुनें",
      typePlaceholder: "स्मृतिसारथी को संदेश लिखें...",
      send: "भेजें",
      listening: "ध्यान से सुन रहा हूँ... बोलिए",
      saathiSpeaking: "स्मृतिसारथी बोल रहा है...",
      askHint: "💡 स्मृतिसारथी से संकेत पूछें",
      hintTitle: "स्मृतिसारथी का संकेत:",
      question: "प्रश्न",
      of: "में से",
      allPairsMatched: "🎉 सभी जोड़े मिल गए! बहुत सुंदर!",
      photoRestored: "✨ तस्वीर पूरी हो गई!",
      soundPrompt: "🔊 आवाज सुनने के लिए दबाएँ",
      gardenTitle: "आपका स्मृति बगीचा",
      gardenLevel: "स्तर",
      gardenSub: "हर अभ्यास और याद के साथ यह बगीचा हरा-भरा होता है।",
      aiDifficulty: "AI कठिनाई स्तर:",
      gentle: "सरल",
      standard: "मध्यम",
      focus: "गहन",
      step: "चरण",
      remindersTitle: "दैनिक देखभाल और दवाइयाँ",
      remindersSub: "दवा लेने के बाद 'हो गया' पर टिक करें:",
      memoriesTitle: "मेरी प्यारी यादें",
      playTitle: "स्मृति खेल और अभ्यास",
    },
    Bengali: {
      back: "ফিরে যান",
      backToGames: "খেলার তালিকায় ফিরে যান",
      done: "সম্পন্ন হয়েছে ✓",
      markDone: "সম্পন্ন হিসেবে চিহ্নিত করুন",
      snooze: "১৫ মিনিট পরে মনে করান",
      tapToListen: "🔊 শুনুন",
      tapToSpeak: "কথা বলতে ট্যাপ করুন",
      tapToListenAgain: "🔊 আবার শুনুন",
      typePlaceholder: "স্মৃতিসাৰথীকে বার্তা লিখুন...",
      send: "পাঠান",
      listening: "মন দিয়ে শুনছি... বলুন",
      saathiSpeaking: "স্মৃতিসাৰথী কথা বলছে...",
      askHint: "💡 স্মৃতিসাৰথীর কাছে সংকেত চান",
      hintTitle: "স্মৃতিসাৰথীর সংকেত:",
      question: "প্রশ্ন",
      of: "এর মধ্যে",
      allPairsMatched: "🎉 সব জোড়া মিলে গেছে! দারুণ!",
      photoRestored: "✨ ছবিটি সম্পন্ন হয়েছে!",
      soundPrompt: "🔊 শব্দ শুনতে ট্যাপ করুন",
      gardenTitle: "আপনার স্মৃতি বাগান",
      gardenLevel: "স্তর",
      gardenSub: "প্রতিটি অনুশীলনের সাথে এই বাগান সুন্দরভাবে প্রস্ফুটিত হয়।",
      aiDifficulty: "AI অসুবিধা স্তর:",
      gentle: "সহজ",
      standard: "সাধারণ",
      focus: "গভীর",
      step: "ধাপ",
      remindersTitle: "দৈনন্দিন যত্ন ও ওষুধের তালিকা",
      remindersSub: "নেওয়ার পর 'সম্পন্ন' চিহ্নিত করুন বা শুনুন:",
      memoriesTitle: "আমার সোনালী স্মৃতিসমূহ",
      playTitle: "স্মৃতি খেলা ও চর্চা",
    },
    English: {
      back: "Go Back",
      backToGames: "Back to Games List",
      done: "Completed ✓",
      markDone: "Mark as Done",
      snooze: "Snooze 15m",
      tapToListen: "🔊 Listen",
      tapToSpeak: "Tap to Speak Aloud",
      tapToListenAgain: "🔊 Listen Again",
      typePlaceholder: "Type message to Saathi...",
      send: "Send",
      listening: "Listening closely… Speak now",
      saathiSpeaking: "Saarthi is speaking aloud…",
      askHint: "💡 Ask Saarthi for a gentle hint",
      hintTitle: "Saarthi's Clue:",
      question: "Question",
      of: "of",
      allPairsMatched: "🎉 All pairs matched wonderfully!",
      photoRestored: "✨ Photo Restored!",
      soundPrompt: "🔊 Tap to Play Sound",
      gardenTitle: "Your Memory Garden",
      gardenLevel: "Level",
      gardenSub: "Grows with every warm memory and cognitive game you play.",
      aiDifficulty: "AI Difficulty Adaptation:",
      gentle: "Gentle",
      standard: "Standard",
      focus: "Focus",
      step: "Step",
      remindersTitle: "Daily Care & Reminders",
      remindersSub: "Tap 'Done' once completed or hear Saathi read aloud:",
      memoriesTitle: "My Cherished Memories",
      playTitle: "Play & Memory Activities",
    },
    Bodo: {
      back: "नोँथांनि थांनाय",
      backToGames: "गेलेमु फारियाव थांफिन",
      done: "जाबाय ✓",
      markDone: "जाबाय होनना लिर",
      snooze: "15 मिनिट उनाव",
      tapToListen: "🔊 खोनासं",
      tapToSpeak: "बुंनो थाखाय थु",
      tapToListenAgain: "🔊 फिन खोनासं",
      typePlaceholder: "सारथीनाव लिर...",
      send: "हर",
      listening: "खोनासंगासिनो दं... बुं",
      saathiSpeaking: "सारथिया बुंगासिनो दं...",
      askHint: "💡 सारथीनाव सों",
      hintTitle: "सारथीनि सुबंग:",
      question: "सोंथि",
      of: "नि मादाव",
      allPairsMatched: "🎉 गासैबो ज'रा मिलिबाय!",
      photoRestored: "✨ सावगारिया जोबबाय!",
      soundPrompt: "🔊 सोदोब खोनासंनो थु",
      gardenTitle: "नोंथांनि गोसोखांथि बारग'",
      gardenLevel: "बाहागो",
      gardenSub: "सानफ्रोमनि गेलेनायजों बे बारग'या बिलाइ फोनाङो।",
      aiDifficulty: "AI गोब्राब बाहागो:",
      gentle: "गोरलै",
      standard: "गेजेर",
      focus: "गोब्राब",
      step: "थाखो",
      remindersTitle: "सानफ्रोमनि मुलि",
      remindersSub: "जाखांनानै थु:",
      memoriesTitle: "आंनि गोसोखांथि",
      playTitle: "गोसोआव लाखिनाय गेलेनाय",
    },
    Manipuri: {
      back: "হনবা",
      backToGames: "শান্নপোৎ লিশ্ততা হল্লকপা",
      done: "লোইরে ✓",
      markDone: "লোইরে হায়না নম্মু",
      snooze: "মিনিত ১৫ লেইরগা",
      tapToListen: "🔊 তাবা",
      tapToSpeak: "ঙাংনবা নম্বীয়ু",
      tapToListenAgain: "🔊 অমুক হন্না তাবা",
      typePlaceholder: "সাৰথীদা ইবা...",
      send: "থাগৎপা",
      listening: "তাবা ফংই... ঙাংবীয়ু",
      saathiSpeaking: "সাৰথীনা ঙাংলি...",
      askHint: "💡 সাৰথীদা পাউতাক হায়বা",
      hintTitle: "সাৰথীগী পাউতাক:",
      question: "ৱাহং",
      of: "গী মনুংদা",
      allPairsMatched: "🎉 পুম্নমক চুনরে!",
      photoRestored: "✨ ফোতো মপুং ফারে!",
      soundPrompt: "🔊 খোন্থোক তানবা নম্বীয়ু",
      gardenTitle: "অদোমগী নীংশিং লৈকোল",
      gardenLevel: "থাক",
      gardenSub: "নীংশিং শান্নপোৎ শানবা মতমদা লৈকোল অসি পাকথোকই।",
      aiDifficulty: "AI থাক:",
      gentle: "লাইবা",
      standard: "ময়াই",
      focus: "কনবা",
      step: "থাক",
      remindersTitle: "নোংমগী হিদাক-লাংথক",
      remindersSub: "লোইবা মতমদা লোইরে নম্বীয়ু:",
      memoriesTitle: "ঐগী নীংশিং লানফম",
      playTitle: "নীংশিং শান্নপোৎ",
    },
  },

  // --- Multilingual Cognitive Games Datasets across 3 AI Levels ---
  gamesDataByLang: {
    Assamese: {
      whoAmI: {
        1: [
          { id: "raj", question: "আপোনাৰ মৰমৰ ল'ৰা কোনজন, যিয়ে সন্ধিয়া চাহ লগত আনে?", correctId: 1, options: [1, 2], hint: "তেওঁ গুৱাহাটীত কাম কৰে।" },
          { id: "riya", question: "আপোনাৰ লগত বিহু নাচিবলৈ ভালপোৱা সৰু মৰমৰ নাতিনী কোনজনী?", correctId: 2, options: [2, 3], hint: "তাই ১২ বছৰীয়া স্কুলীয়া ছোৱালী।" },
        ],
        2: [
          { id: "raj", question: "সন্ধিয়া গৰম বিস্কুট আৰু চাহ লৈ অহা আপোনাৰ ল'ৰাজনক চিনাক্ত কৰক:", correctId: 1, options: [1, 2, 3], hint: "তেওঁৰ নাম ৰাজ।" },
          { id: "ananya", question: "আপোনাৰ বাবে ঔষধ আৰু সুস্বাদু খাৰ ৰন্ধা বোৱাৰী কোনগৰাকী?", correctId: 3, options: [1, 3, 5], hint: "তেওঁ আপোনাৰ স্বাস্থ্যৰ যত্ন লয়।" },
          { id: "riya", question: "বাৰাণ্ডাত নাৰ্জী ফুলৰ মালা পিন্ধাই দিয়া মৰমৰ নাতিনী কোনজনী?", correctId: 2, options: [2, 3, 4], hint: "তাইৰ নাম ৰীয়া।" },
        ],
        3: [
          { id: "pranab", question: "ব্ৰহ্মপুত্ৰৰ বুকুত উমানন্দলৈ লগত যোৱা তেজপুৰৰ প্ৰাক্তন অধ্যক্ষ আপোনাৰ জীৱনসংগী কোন?", correctId: 4, options: [1, 3, 4, 5], hint: "তেওঁ ৪৮ বছৰ আপোনাৰ লগত আছিল।" },
          { id: "kakoli", question: "যোৰহাটৰ পৰা প্ৰতি দেওবাৰে পিঠা-পনাৰ কথা পাতিবলৈ ফোন কৰা আপোনাৰ ভনীগৰাকী কোন?", correctId: 5, options: [2, 3, 4, 5], hint: "তেওঁ মুগা চাদৰ বয়।" },
          { id: "ananya", question: "GMCH চিকিৎসালয়লৈ আপোনাক মৰমেৰে লৈ যোৱা বোৱাৰী কোনগৰাকী?", correctId: 3, options: [1, 2, 3, 4], hint: "তেওঁৰ নাম অনন্যা শৰ্মা।" },
        ],
      },
      memoryPairs: {
        1: [
          { id: "tea", label: "অসম চাহ", emoji: "🍵" },
          { id: "flower", label: "নাৰ্জী ফুল", emoji: "🌼" },
        ],
        2: [
          { id: "tea", label: "অসম চাহ", emoji: "🍵" },
          { id: "flower", label: "নাৰ্জী ফুল", emoji: "🌼" },
          { id: "bird", label: "ময়ূৰ পক্ষী", emoji: "🦚" },
        ],
        3: [
          { id: "tea", label: "অসম চাহ", emoji: "🍵" },
          { id: "flower", label: "নাৰ্জী ফুল", emoji: "🌼" },
          { id: "bird", label: "ময়ূৰ পক্ষী", emoji: "🦚" },
          { id: "japi", label: "ফুলাম জাপি", emoji: "👒" },
        ],
      },
      routineRecall: {
        1: [
          { step: 1, label: "পুৱাৰ গৰম চাহ আৰু তুলসী প্ৰণাম", emoji: "🍵", time: "পুৱা" },
          { step: 2, label: "দুপৰীয়াৰ পুষ্টিকৰ ভাত-আঞ্জা", emoji: "🍲", time: "দুপৰীয়া" },
          { step: 3, label: "আবেলি বাৰাণ্ডাত শান্ত খোজকাঢ়া", emoji: "🚶🏽‍♀️", time: "আবেলি" },
        ],
        2: [
          { step: 1, label: "পুৱা ৭:৩০ বজাত কুহুমীয়া চাহ", emoji: "🍵", time: "০৭:৩০ AM" },
          { step: 2, label: "পুৱা ৮:৩০ বজাত নিয়মীয়া ঔষধ", emoji: "💊", time: "০৮:৩০ AM" },
          { step: 3, label: "দুপৰীয়া ১:০০ বজাত আহাৰ", emoji: "🍲", time: "০১:০০ PM" },
          { step: 4, label: "আবেলি ৪:৩০ বজাত বাৰাণ্ডাত জিৰণি", emoji: "🚶🏽‍♀️", time: "০৪:৩০ PM" },
        ],
        3: [
          { step: 1, label: "পুৱা ৭:০০ বজাত তুলসী পাত ও গৰম পানী", emoji: "🌿", time: "০৭:০০ AM" },
          { step: 2, label: "পুৱা ৮:৩০ বজাত ৰক্তচাপৰ ঔষধ", emoji: "💊", time: "০৮:৩০ AM" },
          { step: 3, label: "পুৱা ১০:৩০ বজাত স্মৃতি অনুশীলন", emoji: "🧠", time: "১০:৩০ AM" },
          { step: 4, label: "দুপৰীয়া ১:০০ বজাত লঘূ আহাৰ", emoji: "🍲", time: "০১:০০ PM" },
          { step: 5, label: "আবেলি ৪:৩০ বজাত বাৰাণ্ডাত খোজকাঢ়া", emoji: "🚶🏽‍♀️", time: "০৪:৩০ PM" },
        ],
      },
      nerObjects: {
        1: [
          {
            id: "tea",
            question: "অসমৰ কোনটো সুগন্ধি গৰম পনীয় পুৱা সকলোৱে ভালপায়?",
            correct: "অসম চাহ (Assam Tea)",
            emoji: "🍵",
            options: ["অসম চাহ (Assam Tea)", "বৰফৰ ঠাণ্ডা চ'ডা"],
            story: "অসমৰ চাহ সমগ্ৰ বিশ্বতে জনাজাত।",
          },
          {
            id: "flower",
            question: "বিহুত বাৰাণ্ডা শুৱনি কৰা হালধীয়া ফুলটো কি?",
            correct: "নাৰ্জী ফুল (Marigold)",
            emoji: "🌼",
            options: ["নাৰ্জী ফুল (Marigold)", "কাঁইটীয়া কেকটাছ"],
            story: "নাৰ্জী ফুলে ঘৰলৈ সৌন্দৰ্য আনে।",
          },
        ],
        2: [
          {
            id: "japi",
            question: "বাঁহ আৰু তোকো পাতেৰে বনোৱা অসমৰ গৌৰৱৰ মূৰৰ টুপিটো কি?",
            correct: "জাপি (Japi)",
            emoji: "👒",
            options: ["জাপি (Japi)", "আধুনিক ছাতি", "শীতৰ টুপি"],
            story: "জাপি হৈছে অসমীয়া আদৰ-সাদৰৰ প্ৰতীক।",
          },
          {
            id: "gamusa",
            question: "ৰঙা ফুল কটা বগা কপাহী ফুলাম বস্ত্ৰখন কি?",
            correct: "গামোচা (Gamusa)",
            emoji: "🧣",
            options: ["গামোচা (Gamusa)", "বিলাতী টাৱেল", "প্লাষ্টিকৰ কাপোৰ"],
            story: "গামোচাৰে আমি বয়োজ্যেষ্ঠসকলক শ্ৰদ্ধা জনাওঁ।",
          },
        ],
        3: [
          {
            id: "muga",
            question: "কেৱল অসমত পোৱা উজ্জ্বল প্ৰাকৃতিক সোণালী ৰেচম কাপোৰখন কি?",
            correct: "সোণালী মুগা ৰেচম (Muga Silk)",
            emoji: "🧵",
            options: ["সোণালী মুগা ৰেচম (Muga Silk)", "নাইলন কাপোৰ", "পলিয়েষ্টাৰ", "কৃত্রিম সূতা"],
            story: "মুগা ৰেচম শুৱালকুছিৰ শিপিনীসকলৰ অপূৰ্ব সৃষ্টি।",
          },
        ],
      },
      jigsaw: {
        1: {
          title: "বাৰাণ্ডাত ৰীয়াৰ লগত সোণালী ৰ'দ",
          story: "নাতিনী ৰীয়াই বাৰাণ্ডাত ৰ'দালি পুৱাত আনন্দৰে হাঁহিছিল।",
          pieceCount: 2,
          pieces: [
            { id: 0, text: "বাৰাণ্ডাৰ ৰ'দ", emoji: "☀️" },
            { id: 1, text: "নাতিনী ৰীয়া", emoji: "👧🏽" },
          ],
        },
        2: {
          title: "ৰঙালী বিহুৰ আনন্দ",
          story: "পৰিয়ালৰ সকলোৱে মিলি বিহুত নাৰ্জী ফুলেৰে ঘৰ সজাইছিল।",
          pieceCount: 4,
          pieces: [
            { id: 0, text: "হালধীয়া নাৰ্জী", emoji: "🌼" },
            { id: 1, text: "বিহু ঢোল", emoji: "🥁" },
            { id: 2, text: "নাতিনী ৰীয়া", emoji: "👧🏽" },
            { id: 3, text: "মৰমৰ ল'ৰা ৰাজ", emoji: "🧑🏽" },
          ],
        },
        3: {
          title: "মহামিলন বিহু সমাৰোহ",
          story: "ব্ৰহ্মপুত্ৰৰ পাৰত পৰিয়ালৰ সকলোৱে বিহু পিঠা আৰু চাহ খাইছিল।",
          pieceCount: 6,
          pieces: [
            { id: 0, text: "ৰ'দালি পুৱা", emoji: "☀️" },
            { id: 1, text: "ব্ৰহ্মপুত্ৰ নাও", emoji: "⛵" },
            { id: 2, text: "ৰঙালী বিহু", emoji: "🌸" },
            { id: 3, text: "গৰম চাহ", emoji: "🍵" },
            { id: 4, text: "নাতিনী ৰীয়া", emoji: "👧🏽" },
            { id: 5, text: "সোণালী জাপি", emoji: "👒" },
          ],
        },
      },
      soundRecall: {
        1: [
          {
            id: "bell",
            prompt: "মন দি শুনক: এইটো কিহৰ পৱিত্ৰ আৰু শান্ত শব্দ?",
            soundType: "bell",
            options: [
              { label: "মন্দিৰৰ ঘণ্টা (Temple Bell)", emoji: "🔔", correct: true },
              { label: "গাড়ীৰ হৰ্ণ (Car Horn)", emoji: "🚗", correct: false },
            ],
          },
        ],
        2: [
          {
            id: "kettle",
            prompt: "মন দি শুনক: পুৱাৰ পাকঘৰত চাহ উতলাৰ শব্দ কোনটো?",
            soundType: "kettle",
            options: [
              { label: "চাহৰ কেটলীৰ সুহুৰি (Tea Kettle)", emoji: "🍵", correct: true },
              { label: "মেঘৰ গাজনি (Thunder)", emoji: "⚡", correct: false },
              { label: "মটৰ চাইকেল (Motorbike)", emoji: "🏍️", correct: false },
            ],
          },
        ],
        3: [
          {
            id: "river",
            prompt: "মন দি শুনক: ব্ৰহ্মপুত্ৰৰ পাৰত পানী বৈ যোৱাৰ শান্ত ধ্বনি কোনটো?",
            soundType: "river",
            options: [
              { label: "নদীৰ জলতৰঙ্গ (River Stream)", emoji: "🌊", correct: true },
              { label: "কল-কাৰখানাৰ শব্দ (Factory Noise)", emoji: "🏭", correct: false },
              { label: "ৰে'লৰ শব্দ (Train Chug)", emoji: "🚆", correct: false },
              { label: "বিমানৰ শব্দ (Aeroplane)", emoji: "✈️", correct: false },
            ],
          },
        ],
      },
      wordBloom: {
        1: [
          {
            question: "পুৱা গা জুৰোৱা আৰু মন সতেজ কৰা গৰম পানীয়বিধ কি?",
            hint: "অসমৰ বাগিচাৰ চাহ পাতেৰে বনোৱা হয়।",
            options: [
              { label: "গৰম অসম চাহ (Assam Chai)", emoji: "🍵", correct: true },
              { label: "বৰফ দিয়া ঠাণ্ডা পানী", emoji: "🧊", correct: false },
            ],
          },
        ],
        2: [
          {
            question: "ভোগালী বিহুত তিল আৰু গুৰেৰে বনোৱা পৰম্পৰাগত খাদ্যবিধ কি?",
            hint: "খোলাত পিঠাগুড়ি দি চেপেটাকৈ ভজা হয়।",
            options: [
              { label: "তিল পিঠা (Til Pitha)", emoji: "🥟", correct: true },
              { label: "পাস্তা (Pasta)", emoji: "🍝", correct: false },
              { label: "বাৰ্গাৰ (Burger)", emoji: "🍔", correct: false },
            ],
          },
        ],
        3: [
          {
            question: "‘মানুহে মানুহৰ বাবে’ অমৰ গীতটোৰ সুৰকাৰ আৰু কণ্ঠশিল্পী কোন?",
            hint: "সুধাকণ্ঠ হিচাপে যাক সমগ্ৰ ভাৰতে জানে।",
            options: [
              { label: "ড° ভূপেন হাজৰিকা (Dr. Bhupen Hazarika)", emoji: "🎙️", correct: true },
              { label: "আধুনিক পপ গায়ক", emoji: "🎸", correct: false },
              { label: "বিদেশী গায়ক", emoji: "🎷", correct: false },
              { label: "ৰক বেণ্ড", emoji: "🥁", correct: false },
            ],
          },
        ],
      },
    },
    Hindi: {
      whoAmI: {
        1: [
          { id: "raj", question: "आपके प्यारे बेटे कौन हैं, जो शाम को चाय-नाश्ता लाते हैं?", correctId: 1, options: [1, 2], hint: "वे गुवाहाटी में काम करते हैं।" },
          { id: "riya", question: "आपकी प्यारी पोती कौन है, जो आपके साथ बिहू नृत्य करती है?", correctId: 2, options: [2, 3], hint: "वह 12 साल की स्कूल की बच्ची है।" },
        ],
        2: [
          { id: "raj", question: "शाम को गर्म चाय और बिस्कुट लाने वाले आपके बेटे को पहचानें:", correctId: 1, options: [1, 2, 3], hint: "उनका नाम राज है।" },
          { id: "ananya", question: "आपकी देखभाल करने वाली और दवाइयाँ देने वाली बहू कौन हैं?", correctId: 3, options: [1, 3, 5], hint: "उनका नाम अनन्या है।" },
          { id: "riya", question: "बालकनी में गेंदे के फूल सजाने वाली प्यारी पोती कौन है?", correctId: 2, options: [2, 3, 4], hint: "उनका नाम रिया है।" },
        ],
        3: [
          { id: "pranab", question: "ब्रह्मपुत्र नदी पर उमानंद जाने वाले आपके जीवनसारथी कौन थे?", correctId: 4, options: [1, 3, 4, 5], hint: "वे तेजपुर में प्रधानाध्यापक थे।" },
          { id: "kakoli", question: "जोरहाट से हर रविवार फोन करके बात करने वाली आपकी बहन कौन हैं?", correctId: 5, options: [2, 3, 4, 5], hint: "उनका नाम काकोली है।" },
          { id: "ananya", question: "GMCH अस्पताल में आपकी सेहत का ध्यान रखने वाली बहू कौन हैं?", correctId: 3, options: [1, 2, 3, 4], hint: "उनका नाम अनन्या शर्मा है।" },
        ],
      },
      memoryPairs: {
        1: [
          { id: "tea", label: "असम चाय", emoji: "🍵" },
          { id: "flower", label: "गेंदा फूल", emoji: "🌼" },
        ],
        2: [
          { id: "tea", label: "असम चाय", emoji: "🍵" },
          { id: "flower", label: "गेंदा फूल", emoji: "🌼" },
          { id: "bird", label: "मोर पक्षी", emoji: "🦚" },
        ],
        3: [
          { id: "tea", label: "असम चाय", emoji: "🍵" },
          { id: "flower", label: "गेंदा फूल", emoji: "🌼" },
          { id: "bird", label: "मोर पक्षी", emoji: "🦚" },
          { id: "japi", label: "सुंदर जापी टोपी", emoji: "👒" },
        ],
      },
      routineRecall: {
        1: [
          { step: 1, label: "सुबह की गर्म चाय और तुलसी पूजा", emoji: "🍵", time: "सुबह" },
          { step: 2, label: "दोपहर का पौष्टिक भोजन", emoji: "🍲", time: "दोपहर" },
          { step: 3, label: "शाम को बालकनी में सुखद टहलना", emoji: "🚶🏽‍♀️", time: "शाम" },
        ],
        2: [
          { step: 1, label: "सुबह 7:30 बजे गर्म चाय", emoji: "🍵", time: "07:30 AM" },
          { step: 2, label: "सुबह 8:30 बजे दैनिक दवा", emoji: "💊", time: "08:30 AM" },
          { step: 3, label: "दोपहर 1:00 बजे भोजन", emoji: "🍲", time: "01:00 PM" },
          { step: 4, label: "शाम 4:30 बजे बालकनी में टहलना", emoji: "🚶🏽‍♀️", time: "04:30 PM" },
        ],
        3: [
          { step: 1, label: "सुबह 7:00 बजे तुलसी व गुनगुना पानी", emoji: "🌿", time: "07:00 AM" },
          { step: 2, label: "सुबह 8:30 बजे ब्लड प्रेशर की दवा", emoji: "💊", time: "08:30 AM" },
          { step: 3, label: "सुबह 10:30 बजे स्मृति अभ्यास", emoji: "🧠", time: "10:30 AM" },
          { step: 4, label: "दोपहर 1:00 बजे दोपहर का भोजन", emoji: "🍲", time: "01:00 PM" },
          { step: 5, label: "शाम 4:30 बजे बालकनी में टहलना", emoji: "🚶🏽‍♀️", time: "04:30 PM" },
        ],
      },
      nerObjects: {
        1: [
          {
            id: "tea",
            question: "असम का कौन सा खुशबूदार गर्म पेय सुबह सबसे ज्यादा पसंद किया जाता है?",
            correct: "असम चाय (Assam Tea)",
            emoji: "🍵",
            options: ["असम चाय (Assam Tea)", "बर्फ वाला ठंडा सोडा"],
            story: "असम की चाय पूरी दुनिया में प्रसिद्ध है।",
          },
        ],
        2: [
          {
            id: "japi",
            question: "बांस और पत्तों से बनी असम की पारंपरिक सुंदर टोपी कौन सी है?",
            correct: "जापी (Japi)",
            emoji: "👒",
            options: ["जापी (Japi)", "आधुनिक छाता", "ऊनी टोपी"],
            story: "जापी असमिया संस्कृति और स्वागत का प्रतीक है।",
          },
          {
            id: "gamusa",
            question: "लाल कढ़ाई वाला सफेद असमिया पारंपरिक कपड़ा क्या कहलाता है?",
            correct: "गामोसा (Gamusa)",
            emoji: "🧣",
            options: ["गामोसा (Gamusa)", "तौलिया", "प्लास्टिक कपड़ा"],
            story: "गामोसा बड़ों के प्रति सम्मान का प्रतीक है।",
          },
        ],
        3: [
          {
            id: "muga",
            question: "असम का प्रसिद्ध प्राकृतिक सुनहरा रेशम कौन सा है?",
            correct: "सुनहरा मूंगा सिल्क (Muga Silk)",
            emoji: "🧵",
            options: ["सुनहरा मूंगा सिल्क (Muga Silk)", "नायलॉन", "पॉलिएस्टर", "सूती धागा"],
            story: "मूंगा सिल्क सुआलकुची के बुनकरों की अनमोल देन है।",
          },
        ],
      },
      jigsaw: {
        1: {
          title: "बालकनी में रिया के साथ सुनहरी धूप",
          story: "पोती रिया ने बालकनी में मुस्कुराते हुए सुबह की धूप का आनंद लिया।",
          pieceCount: 2,
          pieces: [
            { id: 0, text: "बालकनी की धूप", emoji: "☀️" },
            { id: 1, text: "पोती रिया", emoji: "👧🏽" },
          ],
        },
        2: {
          title: "बिहू उत्सव की खुशियाँ",
          story: "पूरे परिवार ने मिलकर फूलों से घर सजाया।",
          pieceCount: 4,
          pieces: [
            { id: 0, text: "पीला गेंदा", emoji: "🌼" },
            { id: 1, text: "बिहू ढोल", emoji: "🥁" },
            { id: 2, text: "पोती रिया", emoji: "👧🏽" },
            { id: 3, text: "बेटा राज", emoji: "🧑🏽" },
          ],
        },
        3: {
          title: "पारिवारिक बिहू मिलन",
          story: "ब्रह्मपुत्र के तट पर सबने मिलकर चाय और मीठे पकवानों का आनंद लिया।",
          pieceCount: 6,
          pieces: [
            { id: 0, text: "सुबह की धूप", emoji: "☀️" },
            { id: 1, text: "नाव की सैर", emoji: "⛵" },
            { id: 2, text: "बिहू पर्व", emoji: "🌸" },
            { id: 3, text: "गर्म चाय", emoji: "🍵" },
            { id: 4, text: "पोती रिया", emoji: "👧🏽" },
            { id: 5, text: "सुनहरी जापी", emoji: "👒" },
          ],
        },
      },
      soundRecall: {
        1: [
          {
            id: "bell",
            prompt: "ध्यान से सुनें: यह कौन सी पवित्र और शांत ध्वनि है?",
            soundType: "bell",
            options: [
              { label: "मंदिर की घंटी (Temple Bell)", emoji: "🔔", correct: true },
              { label: "गाड़ी का हॉर्न", emoji: "🚗", correct: false },
            ],
          },
        ],
        2: [
          {
            id: "kettle",
            prompt: "ध्यान से सुनें: सुबह रसोई में चाय की केतली की सीटी कौन सी है?",
            soundType: "kettle",
            options: [
              { label: "चाय की केतली की सीटी (Tea Kettle)", emoji: "🍵", correct: true },
              { label: "बिजली कड़कना", emoji: "⚡", correct: false },
              { label: "मोटरसाइकिल की आवाज", emoji: "🏍️", correct: false },
            ],
          },
        ],
        3: [
          {
            id: "river",
            prompt: "ध्यान से सुनें: नदी की बहती जलधारा की शांत ध्वनि कौन सी है?",
            soundType: "river",
            options: [
              { label: "नदी की जलधारा (River Stream)", emoji: "🌊", correct: true },
              { label: "कारखाने का शोर", emoji: "🏭", correct: false },
              { label: "ट्रेन की आवाज", emoji: "🚆", correct: false },
              { label: "हवाई जहाज", emoji: "✈️", correct: false },
            ],
          },
        ],
      },
      wordBloom: {
        1: [
          {
            question: "सुबह शरीर और मन को तरोताजा करने वाला गर्म पेय कौन सा है?",
            hint: "असम के बागानों की पत्तियों से बनता है।",
            options: [
              { label: "गर्म असम चाय (Assam Chai)", emoji: "🍵", correct: true },
              { label: "बर्फ का ठंडा पानी", emoji: "🧊", correct: false },
            ],
          },
        ],
        2: [
          {
            question: "त्योहारों में तिल और गुड़ से बनने वाला असम का पारंपरिक व्यंजन कौन सा है?",
            hint: "चावल के आटे से कुरकुरा बनाया जाता है।",
            options: [
              { label: "तिल पीठा (Til Pitha)", emoji: "🥟", correct: true },
              { label: "पास्ता (Pasta)", emoji: "🍝", correct: false },
              { label: "बर्गर (Burger)", emoji: "🍔", correct: false },
            ],
          },
        ],
        3: [
          {
            question: "‘मनुष्यता ही धर्म है’ जैसे अमर गीतों के महान गायक कौन हैं?",
            hint: "जिन्हें पूरे भारत में सुधाकंठ कहा जाता है।",
            options: [
              { label: "डॉ. भूपेन हजारिका (Dr. Bhupen Hazarika)", emoji: "🎙️", correct: true },
              { label: "पॉप गायक", emoji: "🎸", correct: false },
              { label: "विदेशी गायक", emoji: "🎷", correct: false },
              { label: "रॉक बैंड", emoji: "🥁", correct: false },
            ],
          },
        ],
      },
    },
    Bengali: {
      whoAmI: {
        1: [
          { id: "raj", question: "আপনার স্নেহের ছেলে কে, যিনি সন্ধ্যায় চা-বিস্কুট নিয়ে আসেন?", correctId: 1, options: [1, 2], hint: "তিনি গুয়াহাটিতে কাজ করেন।" },
          { id: "riya", question: "আপনার সাথে বিহু নাচ করতে ভালোবাসে এমন ছোট মিষ্টি নাতনি কে?", correctId: 2, options: [2, 3], hint: "সে ১২ বছরের মিষ্টি মেয়ে।" },
        ],
        2: [
          { id: "raj", question: "সন্ধ্যায় গরম বিস্কুট ও চা নিয়ে আসা আপনার ছেলেকে চিহ্নিত করুন:", correctId: 1, options: [1, 2, 3], hint: "তার নাম রাজ।" },
          { id: "ananya", question: "আপনার যত্ন নেন এবং ওষুধপত্র দেন এমন বৌমা কে?", correctId: 3, options: [1, 3, 5], hint: "তার নাম অনন্যা।" },
          { id: "riya", question: "বারান্দায় গাঁদা ফুলের মালা পরিয়ে দেওয়া মিষ্টি নাতনি কে?", correctId: 2, options: [2, 3, 4], hint: "তার নাম রিয়া।" },
        ],
        3: [
          { id: "pranab", question: "উমানন্দ দ্বীপে একসাথে যাওয়া তেজপুরের প্রাক্তন প্রধান শিক্ষক আপনার স্বামী কে?", correctId: 4, options: [1, 3, 4, 5], hint: "তিনি ৪৮ বছর আপনার সাথে ছিলেন।" },
          { id: "kakoli", question: "যোরহাট থেকে প্রতি রবিবার ফোনে কথা বলা আপনার বোন কে?", correctId: 5, options: [2, 3, 4, 5], hint: "তার নাম কাকলী।" },
          { id: "ananya", question: "GMCH হাসপাতালে আপনার স্বাস্থ্যের খেয়াল রাখা বৌমা কে?", correctId: 3, options: [1, 2, 3, 4], hint: "অনন্যা শর্মা।" },
        ],
      },
      memoryPairs: {
        1: [
          { id: "tea", label: "আসাম চা", emoji: "🍵" },
          { id: "flower", label: "গাঁদা ফুল", emoji: "🌼" },
        ],
        2: [
          { id: "tea", label: "আসাম চা", emoji: "🍵" },
          { id: "flower", label: "গাঁদা ফুল", emoji: "🌼" },
          { id: "bird", label: "ময়ূর পাখি", emoji: "🦚" },
        ],
        3: [
          { id: "tea", label: "আসাম চা", emoji: "🍵" },
          { id: "flower", label: "গাঁদা ফুল", emoji: "🌼" },
          { id: "bird", label: "ময়ূর পাখি", emoji: "🦚" },
          { id: "japi", label: "ঐতিহ্যবাহী জাপি", emoji: "👒" },
        ],
      },
      routineRecall: {
        1: [
          { step: 1, label: "সকালের গরম চা ও তুলসী প্রণাম", emoji: "🍵", time: "সকাল" },
          { step: 2, label: "দুপুরের পুষ্টিকর খাবার", emoji: "🍲", time: "দুপুর" },
          { step: 3, label: "বিকালে বারান্দায় শান্ত পদচারণা", emoji: "🚶🏽‍♀️", time: "বিকাল" },
        ],
        2: [
          { step: 1, label: "সকাল ৭:৩০টায় গরম চা", emoji: "🍵", time: "০৭:৩০ AM" },
          { step: 2, label: "সকাল ৮:৩০টায় প্রাত্যহিক ওষুধ", emoji: "💊", time: "০৮:৩০ AM" },
          { step: 3, label: "দুপুর ১:০০টায় খাবার", emoji: "🍲", time: "০১:০০ PM" },
          { step: 4, label: "বিকাল ৪:৩০টায় বারান্দায় বিশ্রাম", emoji: "🚶🏽‍♀️", time: "০৪:৩০ PM" },
        ],
        3: [
          { step: 1, label: "সকাল ৭:০০টায় তুলসী ও হালকা গরম জল", emoji: "🌿", time: "০৭:০০ AM" },
          { step: 2, label: "সকাল ৮:৩০টায় রক্তচাপের ওষুধ", emoji: "💊", time: "০৮:৩০ AM" },
          { step: 3, label: "সকাল ১০:৩০টায় স্মৃতিচর্চা খেলা", emoji: "🧠", time: "১০:৩০ AM" },
          { step: 4, label: "দুপুর ১:০০টায় দুপুরের খাবার", emoji: "🍲", time: "০১:০০ PM" },
          { step: 5, label: "বিকাল ৪:৩০টায় বারান্দায় হাঁটা", emoji: "🚶🏽‍♀️", time: "০৪:৩০ PM" },
        ],
      },
      nerObjects: {
        1: [
          {
            id: "tea",
            question: "আসামের কোন সুগন্ধি গরম পানীয় সকালে সবচেয়ে প্রিয়?",
            correct: "আসাম চা (Assam Tea)",
            emoji: "🍵",
            options: ["আসাম চা (Assam Tea)", "বরফ দেওয়া ঠান্ডা পানীয়"],
            story: "আসামের চা বিশ্বজুড়ে বিখ্যাত।",
          },
        ],
        2: [
          {
            id: "japi",
            question: "বাঁশ ও পাতা দিয়ে তৈরি আসামের ঐতিহ্যবাহী সুন্দর টুপি কোনটি?",
            correct: "জাপি (Japi)",
            emoji: "👒",
            options: ["জাপি (Japi)", "আধুনিক ছাতা", "উলের টুপি"],
            story: "জাপি হলো আসামের ঐতিহ্য ও শ্রদ্ধার প্রতীক।",
          },
          {
            id: "gamusa",
            question: "লাল নকশা আঁকা সাদা ঐতিহ্যবাহী অসমীয়া বস্ত্র কোনটি?",
            correct: "গামোছা (Gamusa)",
            emoji: "🧣",
            options: ["গামোছা (Gamusa)", "সাধারণ তোয়ালে", "প্লাস্টিকের কাপড়"],
            story: "গামোছা দিয়ে আমরা গুরুজনদের শ্রদ্ধা জানাই।",
          },
        ],
        3: [
          {
            id: "muga",
            question: "আসামের বিশ্ববিখ্যাত প্রাকৃতিক সোনালী রেশম কোনটি?",
            correct: "সোনালী মুগা সিল্ক (Muga Silk)",
            emoji: "🧵",
            options: ["সোনালী মুগা সিল্ক (Muga Silk)", "নাইলন", "পলিয়েস্টার", "সুতি কাপড়"],
            story: "মুগা সিল্ক শুয়ালকুচির তাঁতিদের অনন্য শিল্পকর্ম।",
          },
        ],
      },
      jigsaw: {
        1: {
          title: "বারান্দায় রিয়ার সাথে মিষ্টি রোদ",
          story: "নাতনি রিয়া বারান্দায় মিষ্টি রোদে হেসেছিল।",
          pieceCount: 2,
          pieces: [
            { id: 0, text: "বারান্দার রোদ", emoji: "☀️" },
            { id: 1, text: "নাতনি রিয়া", emoji: "👧🏽" },
          ],
        },
        2: {
          title: "বিহু উৎসবের আনন্দ",
          story: "পরিবারের সবাই মিলে ফুল দিয়ে বারান্দা সাজিয়েছিল।",
          pieceCount: 4,
          pieces: [
            { id: 0, text: "হলুদ গাঁদা", emoji: "🌼" },
            { id: 1, text: "বিহু ঢাক", emoji: "🥁" },
            { id: 2, text: "নাতনি রিয়া", emoji: "👧🏽" },
            { id: 3, text: "স্নেহের ছেলে রাজ", emoji: "🧑🏽" },
          ],
        },
        3: {
          title: "পারিবারিক বিহু মিলনমেলা",
          story: "ব্রহ্মপুত্রের তীরে সবাই মিলে চা ও মিষ্টি পিঠার আনন্দ উপভোগ করেছিল।",
          pieceCount: 6,
          pieces: [
            { id: 0, text: "সকালের রোদ", emoji: "☀️" },
            { id: 1, text: "নদীর নৌকা", emoji: "⛵" },
            { id: 2, text: "বিহু উৎসব", emoji: "🌸" },
            { id: 3, text: "গরম চা", emoji: "🍵" },
            { id: 4, text: "নাতনি রিয়া", emoji: "👧🏽" },
            { id: 5, text: "সোনালী জাপি", emoji: "👒" },
          ],
        },
      },
      soundRecall: {
        1: [
          {
            id: "bell",
            prompt: "মন দিয়ে শুনুন: এটি কোন পবিত্র ও শান্ত শব্দের ধ্বনি?",
            soundType: "bell",
            options: [
              { label: "মন্দিরের ঘণ্টা (Temple Bell)", emoji: "🔔", correct: true },
              { label: "গাড়ির হর্ন", emoji: "🚗", correct: false },
            ],
          },
        ],
        2: [
          {
            id: "kettle",
            prompt: "মন দিয়ে শুনুন: সকালে রান্নাঘরে চায়ের কেটলির শব্দ কোনটি?",
            soundType: "kettle",
            options: [
              { label: "চায়ের কেটলির সিটি (Tea Kettle)", emoji: "🍵", correct: true },
              { label: "মেঘের গর্জন", emoji: "⚡", correct: false },
              { label: "মোটরসাইকেলের শব্দ", emoji: "🏍️", correct: false },
            ],
          },
        ],
        3: [
          {
            id: "river",
            prompt: "মন দিয়ে শুনুন: নদীর বয়ে চলা জলের শান্ত ধ্বনি কোনটি?",
            soundType: "river",
            options: [
              { label: "নদীর জলধারা (River Stream)", emoji: "🌊", correct: true },
              { label: "কারখানার শব্দ", emoji: "🏭", correct: false },
              { label: "ট্রেনের শব্দ", emoji: "🚆", correct: false },
              { label: "উড়োজাহাজ", emoji: "✈️", correct: false },
            ],
          },
        ],
      },
      wordBloom: {
        1: [
          {
            question: "সকালে মন ও শরীর চাঙ্গা করা গরম পানীয় কোনটি?",
            hint: "আসামের চায়ের পাতা দিয়ে তৈরি।",
            options: [
              { label: "গরম আসাম চা (Assam Chai)", emoji: "🍵", correct: true },
              { label: "বরফ দেওয়া ঠান্ডা জল", emoji: "🧊", correct: false },
            ],
          },
        ],
        2: [
          {
            question: "উৎসবে তিল ও গুড় দিয়ে তৈরি ঐতিহ্যবাহী খাবার কোনটি?",
            hint: "চালের গুঁড়া দিয়ে তৈরি সুস্বাদু পিঠা।",
            options: [
              { label: "তিল পিঠা (Til Pitha)", emoji: "🥟", correct: true },
              { label: "পাস্তা (Pasta)", emoji: "🍝", correct: false },
              { label: "বার্গার (Burger)", emoji: "🍔", correct: false },
            ],
          },
        ],
        3: [
          {
            question: "‘মানুষ মানুষের জন্যে’ অমর গানের মহান শিল্পী কে?",
            hint: "যাকে সারা ভারত সুধাকণ্ঠ নামে জানে।",
            options: [
              { label: "ড. ভূপেন হাজারিকা (Dr. Bhupen Hazarika)", emoji: "🎙️", correct: true },
              { label: "পপ গায়ক", emoji: "🎸", correct: false },
              { label: "বিদেশি গায়ক", emoji: "🎷", correct: false },
              { label: "রক ব্যান্ড", emoji: "🥁", correct: false },
            ],
          },
        ],
      },
    },
    English: {
      whoAmI: {
        1: [
          { id: "raj", question: "Who is your beloved son who visits with evening tea biscuits?", correctId: 1, options: [1, 2], hint: "He works in Guwahati." },
          { id: "riya", question: "Who is your sweet 12-year-old granddaughter who dances Bihu?", correctId: 2, options: [2, 3], hint: "She decorated the veranda." },
        ],
        2: [
          { id: "raj", question: "Identify your son who brings warm snacks every evening:", correctId: 1, options: [1, 2, 3], hint: "His name is Raj." },
          { id: "ananya", question: "Who is your caring daughter-in-law who cooks and helps with meds?", correctId: 3, options: [1, 3, 5], hint: "Her name is Ananya." },
          { id: "riya", question: "Who is your bright granddaughter wearing the yellow marigolds?", correctId: 2, options: [2, 3, 4], hint: "Her name is Riya." },
        ],
        3: [
          { id: "pranab", question: "Who was your late husband, the school principal who crossed Brahmaputra with you?", correctId: 4, options: [1, 3, 4, 5], hint: "You shared 48 lovely years together." },
          { id: "kakoli", question: "Who is your sister in Jorhat who calls every Sunday morning?", correctId: 5, options: [2, 3, 4, 5], hint: "Her name is Kakoli." },
          { id: "ananya", question: "Who is your daughter-in-law managing your GMCH appointments?", correctId: 3, options: [1, 2, 3, 4], hint: "Ananya Sarma." },
        ],
      },
      memoryPairs: {
        1: [
          { id: "tea", label: "Assam Tea", emoji: "🍵" },
          { id: "flower", label: "Marigold", emoji: "🌼" },
        ],
        2: [
          { id: "tea", label: "Assam Tea", emoji: "🍵" },
          { id: "flower", label: "Marigold", emoji: "🌼" },
          { id: "bird", label: "Peacock", emoji: "🦚" },
        ],
        3: [
          { id: "tea", label: "Assam Tea", emoji: "🍵" },
          { id: "flower", label: "Marigold", emoji: "🌼" },
          { id: "bird", label: "Peacock", emoji: "🦚" },
          { id: "japi", label: "Traditional Japi", emoji: "👒" },
        ],
      },
      routineRecall: {
        1: [
          { step: 1, label: "Morning Warm Assam Tea", emoji: "🍵", time: "Morning" },
          { step: 2, label: "Nutritious Midday Lunch", emoji: "🍲", time: "Afternoon" },
          { step: 3, label: "Gentle Veranda Stroll", emoji: "🚶🏽‍♀️", time: "Evening" },
        ],
        2: [
          { step: 1, label: "7:30 AM Morning Tea", emoji: "🍵", time: "07:30 AM" },
          { step: 2, label: "8:30 AM Daily Medication", emoji: "💊", time: "08:30 AM" },
          { step: 3, label: "1:00 PM Warm Lunch", emoji: "🍲", time: "01:00 PM" },
          { step: 4, label: "4:30 PM Veranda Walk", emoji: "🚶🏽‍♀️", time: "04:30 PM" },
        ],
        3: [
          { step: 1, label: "7:00 AM Warm Tulsi Hydration", emoji: "🌿", time: "07:00 AM" },
          { step: 2, label: "8:30 AM BP & Memory Meds", emoji: "💊", time: "08:30 AM" },
          { step: 3, label: "10:30 AM Memory Activities", emoji: "🧠", time: "10:30 AM" },
          { step: 4, label: "1:00 PM Nutritious Lunch", emoji: "🍲", time: "01:00 PM" },
          { step: 5, label: "4:30 PM Veranda Walk", emoji: "🚶🏽‍♀️", time: "04:30 PM" },
        ],
      },
      nerObjects: {
        1: [
          {
            id: "tea",
            question: "Which warm, aromatic morning drink comes from Assam?",
            correct: "Assam Tea (চাহ)",
            emoji: "🍵",
            options: ["Assam Tea (চাহ)", "Cold Ice Soda"],
            story: "Assam tea is known globally for its rich flavor.",
          },
        ],
        2: [
          {
            id: "japi",
            question: "Which traditional conical hat woven from bamboo protects from sun and rain?",
            correct: "Japi (জাপি)",
            emoji: "👒",
            options: ["Japi (জাপি)", "Modern Umbrella", "Winter Cap"],
            story: "The Japi is an iconic symbol of Assamese welcome and heritage.",
          },
          {
            id: "gamusa",
            question: "Which white handwoven cotton cloth with red floral motifs represents respect?",
            correct: "Gamusa (গামোচা)",
            emoji: "🧣",
            options: ["Gamusa (গামোচা)", "Modern Towel", "Plastic Cloth"],
            story: "The Gamusa is presented to elders to convey deepest respect.",
          },
        ],
        3: [
          {
            id: "muga",
            question: "Which rare golden silk is native exclusively to the state of Assam?",
            correct: "Muga Golden Silk (মুগা)",
            emoji: "🧵",
            options: ["Muga Golden Silk (মুগা)", "Nylon", "Polyester", "Cotton Thread"],
            story: "Muga silk shines brighter with every gentle wash.",
          },
        ],
      },
      jigsaw: {
        1: {
          title: "Sunny Veranda with Riya",
          story: "Granddaughter Riya smiled warmly in the golden morning sunlight on your veranda.",
          pieceCount: 2,
          pieces: [
            { id: 0, text: "Veranda Sunshine", emoji: "☀️" },
            { id: 1, text: "Granddaughter Riya", emoji: "👧🏽" },
          ],
        },
        2: {
          title: "Rongali Bihu Joy",
          story: "The whole family decorated the wooden railings with cheerful marigolds.",
          pieceCount: 4,
          pieces: [
            { id: 0, text: "Yellow Marigold", emoji: "🌼" },
            { id: 1, text: "Bihu Dhol", emoji: "🥁" },
            { id: 2, text: "Granddaughter Riya", emoji: "👧🏽" },
            { id: 3, text: "Son Raj", emoji: "🧑🏽" },
          ],
        },
        3: {
          title: "Grand Family Bihu Gathering",
          story: "Enjoying warm tea, fresh pitha, and river views together.",
          pieceCount: 6,
          pieces: [
            { id: 0, text: "Morning Sunshine", emoji: "☀️" },
            { id: 1, text: "River Boat", emoji: "⛵" },
            { id: 2, text: "Bihu Dance", emoji: "🌸" },
            { id: 3, text: "Assam Tea", emoji: "🍵" },
            { id: 4, text: "Riya Smiling", emoji: "👧🏽" },
            { id: 5, text: "Golden Japi", emoji: "👒" },
          ],
        },
      },
      soundRecall: {
        1: [
          {
            id: "bell",
            prompt: "Listen closely: What soothing peaceful sound is this?",
            soundType: "bell",
            options: [
              { label: "Temple Bell (মন্দিৰৰ ঘণ্টা)", emoji: "🔔", correct: true },
              { label: "Car Traffic Horn", emoji: "🚗", correct: false },
            ],
          },
        ],
        2: [
          {
            id: "kettle",
            prompt: "Listen closely: What is this morning kitchen whistling sound?",
            soundType: "kettle",
            options: [
              { label: "Tea Kettle Whistle", emoji: "🍵", correct: true },
              { label: "Thunder Strike", emoji: "⚡", correct: false },
              { label: "Motorbike Engine", emoji: "🏍️", correct: false },
            ],
          },
        ],
        3: [
          {
            id: "river",
            prompt: "Listen closely: What is this gentle flowing water sound?",
            soundType: "river",
            options: [
              { label: "River Stream Waves", emoji: "🌊", correct: true },
              { label: "Factory Machinery", emoji: "🏭", correct: false },
              { label: "Train Locomotive", emoji: "🚆", correct: false },
              { label: "Aeroplane", emoji: "✈️", correct: false },
            ],
          },
        ],
      },
      wordBloom: {
        1: [
          {
            question: "What warm, aromatic morning drink comforts you every morning?",
            hint: "Brewed from Assam tea leaves.",
            options: [
              { label: "Warm Assam Chai (চাহ)", emoji: "🍵", correct: true },
              { label: "Ice Cold Water", emoji: "🧊", correct: false },
            ],
          },
        ],
        2: [
          {
            question: "Which sweet and crunchy delicacy is prepared with sesame and jaggery for Bihu?",
            hint: "Rolled delicately over the hot iron tawa.",
            options: [
              { label: "Til Pitha (তিল পিঠা)", emoji: "🥟", correct: true },
              { label: "Italian Pasta", emoji: "🍝", correct: false },
              { label: "Burger", emoji: "🍔", correct: false },
            ],
          },
        ],
        3: [
          {
            question: "Who sang and composed the immortal anthem 'Manuhe Manuhor Babe'?",
            hint: "Known fondly as the Bard of Brahmaputra.",
            options: [
              { label: "Dr. Bhupen Hazarika (ভূপেন হাজৰিকা)", emoji: "🎙️", correct: true },
              { label: "Pop Singer", emoji: "🎸", correct: false },
              { label: "Foreign Singer", emoji: "🎷", correct: false },
              { label: "Rock Band", emoji: "🥁", correct: false },
            ],
          },
        ],
      },
    },
  },

  // Fallback helper for gamesData
  get gamesData() {
    return this.gamesDataByLang["Assamese"];
  },

  difficultyLevels: [
    { lvl: 1, label: "Gentle (স্তৰ ১)", desc: "2-3 choices, instant cues & warm audio encouragement." },
    { lvl: 2, label: "Standard (স্তৰ ২)", desc: "Balanced recall with 3-4 choices and mild distractors." },
    { lvl: 3, label: "Focus (স্তৰ ৩)", desc: "Deep multi-step sequence & regional cultural memory." },
  ],

  caretakers: [
    {
      id: 1,
      name: "Ananya Sarma",
      email: "ananya.caregiver@smritisaarthi.in",
      pin: "1234",
      password: "caretaker@123",
      role: "Primary Caregiver",
      role_type: "family_caregiver",
      relation: "Daughter-in-law & Primary Caregiver",
      hospital: "Guwahati Elder Care Network",
      avatar: "👩🏽",
      patient_assigned: "Aita Devi (74)",
      phone: "+91 98640 12345",
      badge_color: "sage",
      permissions: ["daily_care", "activity_monitor", "alerts"],
    },
    {
      id: 2,
      name: "Dr. B. Barua, MD",
      email: "dr.barua@gmch.assam.gov.in",
      pin: "5678",
      password: "doctor@123",
      role: "Consultant Geriatrician",
      role_type: "doctor",
      relation: "Attending Geriatric Physician, GMCH",
      hospital: "Gauhati Medical College & Hospital (GMCH)",
      avatar: "🩺",
      patient_assigned: "Aita Devi (74)",
      phone: "+91 94350 56789",
      badge_color: "gold",
      permissions: ["clinical_assessment", "prescription_notes", "mini_cog"],
    },
  ],

  languages: [
    { code: "as", name: "Assamese", native: "অসমীয়া", welcome: "নমস্কাৰ আইতা, আপুনি কেনে আছে?" },
    { code: "hi", name: "Hindi", native: "हिन्दी", welcome: "नमस्ते दादी जी, आप कैसी हैं?" },
    { code: "bn", name: "Bengali", native: "বাংলা", welcome: "নমস্কার ঠাকুমা, আপনি কেমন আছেন?" },
    { code: "en", name: "English", native: "English", welcome: "Good morning Aita, how are you feeling today?" },
    { code: "brx", name: "Bodo", native: "बर'", welcome: "खुलुमबाय आइ, नोंथाङा माबोरै दं?" },
    { code: "mni", name: "Manipuri", native: "মৈতৈলোন্", welcome: "খুরুমজরি ইমা, অদোম কয়া নৌরিগে?" },
  ],

  saathiPhrasesByLang: {
    Assamese: [
      { patient: "ৰাজ কেতিয়া আহিব?", reply: "ৰাজে গুৱাহাটীত কাম শেষ কৰি আজি সন্ধিয়া আপোনাৰ বাবে মিঠা বিস্কুট লৈ আহিব।" },
      { patient: "মই এতিয়া ক'ত আছো?", reply: "আইতা, আপুনি গুৱাহাটীৰ নিজৰ শান্ত আৰু মৰমৰ ঘৰৰ বাৰাণ্ডাত সম্পূৰ্ণ সুৰক্ষিত হৈ বহি আছে।" },
      { patient: "অনন্যাই মোৰ বাবে চাহ বনাইছেনে?", reply: "হয় আইতা, অনন্যাই আপোনাৰ বাবে তুলসীৰে সুগন্ধি অসম চাহ তৈয়াৰ কৰিছে।" },
      { patient: "আজি মই দৰব খালোনে?", reply: "হয় আইতা, আপুনি ৰাতিপুৱাৰ ৰক্তচাপ আৰু স্মৃতিৰ দৰব খাইছে। পৰৱৰ্তী দৰব নিশা গাখীৰৰ সৈতে খাব।" },
      { patient: "ৰিয়া এতিয়া ক'ত আছে?", reply: "ৰিয়া স্কুলৰ পৰা আহি বাৰাণ্ডাত আপোনাৰ লগত বিহু নাচ আৰু সাধু শুনিবলৈ আহি আছে।" },
      { patient: "মোক এটা বিহু গীত বা সাধু শুনোৱা", reply: "শুনক আইতা: 'অতিকৈ চেনেহৰ ৰঙালী বিহুটি, অতিকৈ চেনেহৰ বৰদৈচিলা...' ব্ৰহ্মপুত্ৰৰ পাৰৰ কি অপৰূপ স্মৃতি!" },
      { patient: "মোৰ মনটো বৰ অস্থিৰ লাগিছে", reply: "আইতা ❤️ একো চিন্তা নকৰিব, মই আপোনাৰ কাষতেই আছো। গভীৰভাৱে উশাহ লওক, আপুনি নিজৰ মানুহৰ মাজত আছে।" },
      { patient: "আজিৰ দিনটো কি?", reply: "আজি বৰ সুন্দৰ দিন। বতৰ শান্ত আৰু বাৰাণ্ডাত সুন্দৰ মৃদু বতাহ বলি আছে।" },
      { patient: "মই অলপ বাৰাণ্ডাত খোজ কাঢ়িব পাৰোনে?", reply: "নিশ্চয় আইতা! বাৰাণ্ডাত লাহে লাহে খোজ কঢ়াটো স্বাস্থ্যৰ বাবে বৰ ভাল। আহক আমি যাওঁ।" },
      { patient: "তুমি মোৰ কোন হোৱা?", reply: "মই আপোনাৰ মৰমৰ সংগী স্মৃতিসাৰথী AI। আপোনাৰ সকলো কথা শুনা আৰু সহায় কৰাই মোৰ কাম।" },
    ],
    Hindi: [
      { patient: "राज कब आएगा?", reply: "राज जी आज शाम को दफ्तर के बाद आपसे मिलने आ रहे हैं और आपके मनपसंद बिस्कुट लाएँगे।" },
      { patient: "मैं अभी कहाँ हूँ?", reply: "दादी जी, आप गुवाहाटी में अपने प्यारे और सुरक्षित घर पर हैं। सब आपके साथ हैं।" },
      { patient: "क्या मुझे एक कप चाय मिलेगी?", reply: "हाँ दादी जी, अनन्या जी ने आपके लिए ताजा और गर्म असम चाय तैयार की है।" },
      { patient: "क्या मैंने सुबह की दवाई ले ली?", reply: "हाँ दादी जी, सुबह की बीपी और स्मृति की दवा आपने ले ली है। रात की दवा दूध के साथ लेंगे।" },
      { patient: "रिया कहाँ है?", reply: "रिया स्कूल से लौटकर आपके पास आ रही है, वह आपके साथ बिहू की बातें करेगी।" },
      { patient: "मुझे कोई प्यारी कहानी या गीत सुनाओ", reply: "दादी जी, याद है माजुली द्वीप और ब्रह्मपुत्र की वह सुनहरी नाव यात्रा? कितना पावन और आनंदमय समय था!" },
      { patient: "मुझे थोड़ा डर या घबराहट हो रही है", reply: "दादी जी ❤️ बिल्कुल चिंता न करें। मैं आपके पास हूँ और आप अपने परिवार के प्रेम में पूरी तरह सुरक्षित हैं।" },
      { patient: "आज कौन सा दिन और मौसम कैसा है?", reply: "आज बहुत ही सुखद और शांत दिन है। हल्की सुहानी हवा चल रही है।" },
      { patient: "क्या हम थोड़ा बरामदे में टहलने चलें?", reply: "हाँ दादी जी! बरामदे में हल्की धूप में टहलना आपके स्वास्थ्य के लिए बहुत उत्तम रहेगा।" },
      { patient: "तुम कौन हो?", reply: "मैं आपका सहायक 'स्मृतिसारथी' हूँ दादी जी। मैं हमेशा आपकी मदद के लिए उपस्थित हूँ।" },
    ],
    Bengali: [
      { patient: "রাজ কখন আসবে?", reply: "রাজ আজ সন্ধ্যায় কাজ শেষ করে আপনার জন্য প্রিয় বিস্কুট নিয়ে দেখা করতে আসবেন।" },
      { patient: "আমি এখন কোথায় আছি?", reply: "ঠাকুমা, আপনি গুয়াহাটির নিজের শান্ত ও সুন্দর বাড়িতে পরম নিরাপদে আছেন।" },
      { patient: "অনন্যা কি চা বানিয়েছে?", reply: "হ্যাঁ ঠাকুমা, অনন্যা আপনার জন্য তুলসী পাতা দিয়ে সুগন্ধি আসাম চা তৈরি করেছেন।" },
      { patient: "আমি কি ওষুধ খেয়েছি?", reply: "হ্যাঁ ঠাকুমা, সকালের প্রেসার ও মেমোরি ওষুধ খাওয়া হয়েছে। রাতেরটা দুধের সাথে নেবেন।" },
      { patient: "রিয়া এখন কোথায়?", reply: "রিয়া স্কুল থেকে ফিরে আপনার সাথে গল্প করতে আর নাচ দেখাতে আসছে।" },
      { patient: "আমাকে একটা গল্প বা গান শোনাও", reply: "মনে পড়ে ঠাকুমা, ব্রহ্মপুত্র নদের সেই সুন্দর নৌকা পারাপার আর বিহু উৎসবের আনন্দ?" },
      { patient: "আমার মনটা কেমন অস্থির লাগছে", reply: "ঠাকুমা ❤️ একদম চিন্তা করবেন না, আমি আপনার কাছেই আছি। আপনি পুরোপুরি নিরাপদ।" },
      { patient: "আজকের দিনটি কেমন?", reply: "আজকের দিনটি অত্যন্ত শান্ত ও মনোরম। বারান্দায় খুব মিষ্টি বাতাস বইছে।" },
      { patient: "আমি কি একটু বারান্দায় হাঁটতে পারি?", reply: "অবশ্যই ঠাকুমা! বারান্দায় হালকা হাঁটা আপনার স্বাস্থ্যের জন্য খুব ভালো।" },
      { patient: "তুমি কে?", reply: "আমি আপনার আপন সঙ্গী স্মৃতিসাৰথী। আপনার খেয়াল রাখাই আমার আনন্দ।" },
    ],
    English: [
      { patient: "When will Raj arrive?", reply: "Raj is visiting you this evening right after work. He is bringing your favorite tea biscuits!" },
      { patient: "Where am I right now?", reply: "Aita, you are safely resting in your peaceful home in Guwahati surrounded by family love." },
      { patient: "Has Ananya prepared tea?", reply: "Yes Aita, Ananya has prepared a fresh cup of aromatic Assam tea with tulsi for you." },
      { patient: "Did I take my medicine today?", reply: "Yes Aita, your morning blood pressure and memory medications are completed. Night pills will be with milk." },
      { patient: "Where is granddaughter Riya?", reply: "Riya is coming home from school to sit with you on the veranda and practice her dance." },
      { patient: "Tell me a nostalgic memory or song", reply: "Do you remember the Rongali Bihu celebration on your sunny veranda and the ferry crossing to Umananda? Such golden moments!" },
      { patient: "I am feeling worried or uneasy", reply: "Take a gentle breath, Aita ❤️ I am right here beside you. You are completely safe at home." },
      { patient: "What is today's weather like?", reply: "Today is peaceful and serene with a soft gentle breeze on the veranda." },
      { patient: "Can I take a stroll on the veranda?", reply: "Certainly Aita! A gentle walk in the fresh air is wonderful for your circulation." },
      { patient: "Who are you?", reply: "I am SmritiSaarthi, your AI companion designed with love to assist your memory and daily care." },
    ],
    Bodo: [
      { patient: "राज माब्ला फैगोन?", reply: "राजा दिनै बेलासियाव नोंथांखौ लोगो हमनो फैगोन आरो गोदै बिस्कुट लागोन।" },
      { patient: "आं दा बबेयाव दं?", reply: "आइ, नोंथाङा गावसोरनि गुवाहाटीनि न'आव गोजोनै आरो रैखाथिजों दं।" },
      { patient: "अनन्या साहा बानायबाय ना?", reply: "औ आइ, अनन्या नोंथांनि थाखाय साहा बानायबाय।" },
      { patient: "आं दावखि मुलि जाबाय ना?", reply: "औ आइ, फुंनि मुलि जाबाय। हरनि मुलिया गाखीरजों जागोन।" },
      { patient: "रिया दा बबेयाव दं?", reply: "रिया फरायसालिफ्राय फैनानै नोंथांनि लोगोआव मशानो फैगोन।" },
      { patient: "आंनो मोनसे खन्थाइ खोनथा", reply: "आइ, बै रोंगालि बिहु आरो माजुलि द्वीपनि गोसोखांथिआ बबेबा समायना!" },
      { patient: "आंनि गोसोआ गिदों", reply: "आइ ❤️ गिनाङा, आं नोंथांनि लोगोनो दं। नोंथाङा न'आवनो दं।" },
      { patient: "दिनैनि सान आरो बारहावा माबोरै?", reply: "दिनैनि साना गोजोन आरो बारहावाया जोबोद समायना।" },
      { patient: "आं बरान्दायाव खारनो हागोन ना?", reply: "औ आइ! बरान्दायाव लाम लाम थाबायनाया देहानि थाखाय मोजां।" },
      { patient: "नोंथाङा सोर?", reply: "आं नोंथांनि मोजां लोगो स्मृतिसारथी AI।" },
    ],
    Manipuri: [
      { patient: "রাজনা করি মতমদা লাক্কনি?", reply: "রাজনা ঙসি নুমিদাংদা অদোমগীদমক অপাম্বা বিস্কুট পুদুনা লাক্কনি।" },
      { patient: "ঐহাক হৌজিক কদায়দা লৈরিগে?", reply: "ইমা, অদোম গুৱাহাটীদা লৈবা অদোমগী নুংঙাইরবা য়ুমদা য়াম্না চেকশিন্না লৈরি।" },
      { patient: "অনন্যানা চা শাজিনবীয়বরা?", reply: "হোই ইমা, অনন্যানা অদোমগীদমক মহাও লৈরবা অসম চা শাজিনবীরে।" },
      { patient: "ঐহাক্না অয়ুক্কী হিদাক চাবা য়ারব্রা?", reply: "হোই ইমা, অয়ুক্কী হিদাক চারে। অহিংগী হিদাক্না শঙ্গোমগা লোয়ননা চানবনি।" },
      { patient: "রিয়ানা কদায়দা লৈরিগে?", reply: "রিয়া স্কুলদগী হল্লক্লগা অদোমগী লোয়ননা ৱারী শানবা লাক্কনি।" },
      { patient: "ঐঙোন্দা ৱারী অমা তাকপীয়ু", reply: "ইমা, উমানন্দ দ্বীপ অমসুং ব্রহ্মপুত্র ঈচেলগী মতমদু নীংশিংলিব্রা? য়াম্না নুংঙাইবনি!" },
      { patient: "ঐহাক্না অপীকপা ফীভম অমদা লৈরে", reply: "ইমা ❤️ অদোম অকিবা পোকপীনু, ঐহাক অদোমগী নকন্দা লৈরি।" },
      { patient: "ঙসিগী নুমিৎ অসি করম তৌবগে?", reply: "ঙসিগী নুমিৎ অসি য়াম্না শান্ত ওই অমসুং নুংঙাইরবা নুংশিৎ শিৎলি।" },
      { patient: "ঐহাক বরােন্দাদা খোঙনা চৎপা য়াব্রা?", reply: "হোই ইমা! বরােন্দাদা চৎপা অসি হকচাংগীদমক য়াম্না ফৈ।" },
      { patient: "অদোম কনানো?", reply: "ঐহাক অদোমগী নীংশিং সাৰথী AI নি।" },
    ],
  },

  conversationalIntents: [
    {
      intent: "greeting",
      keywords: ["hello", "hi", "hey", "namaskar", "nomoskar", "namaste", "kemiti", "kene", "kemon", "নমস্কাৰ", "কেমে", "नमस्ते", "হ্যালো", "নমস্কার", "খুলুমबाय", "খুরুমজরি", "good morning", "good evening", "how are you"],
      responses: {
        Assamese: [
          "নমস্কাৰ আইতা ❤️ মই আপোনাৰ স্মৃতিসাৰথী। আজিৰ দিনটো বৰ শান্ত আৰু সুন্দৰ। আপুনি ভালে আছেনে?",
          "নমস্কাৰ আইতা! আপোনাক দেখি মোৰ বৰ আনন্দ লাগিছে। মই আপোনাৰ কাষতেই আছো।",
        ],
        Hindi: [
          "नमस्ते दादी जी ❤️ मैं आपका स्मृतिसारथी हूँ। आज का दिन बहुत सुंदर और मंगलमय है। आप कैसी हैं?",
          "नमस्ते दादी जी! आपके साथ बात करके बहुत खुशी होती है। मैं हमेशा आपके पास हूँ।",
        ],
        Bengali: [
          "নমস্কার ঠাকুমা ❤️ আমি আপনার স্মৃতিসাৰথী। আজকের দিনটি খুব সুন্দর ও শান্ত। আপনি কেমন আছেন?",
        ],
        English: [
          "Hello Aita ❤️ I am your SmritiSaarthi. Wishing you a peaceful and lovely day today. How are you feeling?",
        ],
        Bodo: [
          "खुलुमबाय आइ ❤️ आं नोंथांनि स्मृतिसारथी। दिनैनि साना गोजोन आरो समायना।",
        ],
        Manipuri: [
          "খুরুমজরি ইমা ❤️ ঐহাক অদোমগী স্মৃতিসাৰথীনি। ঙসিগী নুমিৎ অসি য়াম্না নুংঙাই।",
        ],
      },
    },
    {
      intent: "identity_saathi",
      keywords: ["who are you", "what is your name", "your name", "tumi kun", "apuni kun", "tum kon", "aap kaun", "তুমি কে", "তুমি কোন", "আপুনি কোন", "तुम कौन हो", "तुम्हारा नाम", "তোমাক কি কয়"],
      responses: {
        Assamese: [
          "মই আপোনাৰ মৰমৰ সংগী 'স্মৃতিসাৰথী' AI ❤️ আপোনাৰ স্মৃতি সজীৱ ৰখা, পৰিয়ালৰ কথা কোৱা আৰু সহায় কৰাই মোৰ কাম।",
        ],
        Hindi: [
          "दादी जी, मैं आपका डिजिटल सारथी 'स्मृतिसारथी' हूँ ❤️ आपकी देखभाल, यादें ताज़ा रखने और बातें करने के लिए हमेशा यहाँ हूँ।",
        ],
        Bengali: [
          "ঠাকুমা, আমি আপনার প্রিয় ডিজিটাল সঙ্গী 'স্মৃতিসাৰথী' ❤️ আপনার যত্ন নেওয়া এবং গল্প করাই আমার কাজ।",
        ],
        English: [
          "I am SmritiSaarthi ❤️ your AI companion created especially for you to share memories, reminders, and daily care.",
        ],
        Bodo: [
          "आं नोंथांनि स्मृतिसारथी AI आइ ❤️ नोंथांनि गोसोखांथि आरो हेफाजाबनि थाखाय आं दं।",
        ],
        Manipuri: [
          "ঐহাক অদোমগী নীংশিং সাৰথী AI নি ইমা ❤️ অদোমগা ৱারী শানবা অমসুং মতেং পাংবা ঐহাক্না লৈরি।",
        ],
      },
    },
    {
      intent: "orientation_place",
      keywords: ["where am i", "which place", "kot asu", "kathe", "kaha hu", "kothay", "ক'ত আছো", "এইখন কাৰ ঘৰ", "কʼত", "कहाँ हूँ", "ये कहाँ है", "কোথায় আছি", "কোন জায়গা", "बबेयाव", "কদায়দা"],
      responses: {
        Assamese: [
          "আইতা, আপুনি গুৱাহাটীৰ নিজৰ শান্ত আৰু মৰমৰ ঘৰৰ বাৰাণ্ডাত সম্পূৰ্ণ সুৰক্ষিত হৈ বহি আছে। আপোনাৰ পৰিয়াল আপোনাৰ লগত আছে।",
        ],
        Hindi: [
          "दादी जी, आप गुवाहाटी में अपने प्यारे और सुंदर घर पर हैं। आप बिल्कुल सुरक्षित हैं और सब आपके साथ हैं।",
        ],
        Bengali: [
          "ঠাকুমা, আপনি গুয়াহাটির নিজের শান্ত ও সুন্দর বাড়িতে পরম নিরাপদে আছেন। সবাই আপনার কাছেই আছে।",
        ],
        English: [
          "Aita, you are safely resting at your lovely home in Guwahati, sitting peacefully on your sunny veranda.",
        ],
        Bodo: [
          "आइ, नोंथाङा गावसोरनि गुवाहाटीनि न'आवनो गोजोनै दं। गिखंनाङा।",
        ],
        Manipuri: [
          "ইমা, অদোম গুৱাহাটীদা লৈবা অদোমগী নুংঙাইরবা য়ুমদা য়াম্না চেকশিন্না লৈরি।",
        ],
      },
    },
    {
      intent: "time_date_weather",
      keywords: ["what time", "what day", "today", "date", "weather", "samay", "keman baje", "aji", "din", "কি বাৰ", "কয়টা বাজে", "সময়", "আজ কি দিন", "আজকে", "आज कौन सा दिन", "मौसम", "समय", "কি দিন"],
      responses: {
        Assamese: [
          "আজি বৰ শান্ত আৰু সুন্দৰ দিন। বাৰাণ্ডাত সোণালী ৰ'দ পৰিছে আৰু ব্ৰহ্মপুত্ৰৰ দিশৰ পৰা মৃদু বতাহ বলি আছে।",
        ],
        Hindi: [
          "आज का दिन बहुत ही सुखद और शांत है। हल्की धूप और सुहानी हवा चल रही है।",
        ],
        Bengali: [
          "আজকের দিনটি চমৎকার ও শান্ত। মিষ্টি রোদ ও মনোরম মৃদু বাতাস বইছে।",
        ],
        English: [
          "It is a pleasant and bright day today. The morning sunlight and gentle breeze are bringing warmth to the veranda.",
        ],
        Bodo: [
          "दिनैनि साना जोबोद मोजां आरो गोजोन।",
        ],
        Manipuri: [
          "ঙসিগী নুমিৎ অসি য়াম্না শান্ত অমসুং ফজরবা নুমিৎনি।",
        ],
      },
    },
    {
      intent: "family_raj",
      keywords: ["raj", "son", "boy", "lora", "beta", "chele", "ৰাজ", "ল'ৰা", "बेटा", "ছেলে", "রাজ", "मचानुपा"],
      responses: {
        Assamese: [
          "ৰাজে গুৱাহাটীত কাম শেষ কৰি আজি সন্ধিয়া আপোনাক দেখা কৰিবলৈ আহিব। তেওঁ আপোনাৰ বাবে মিঠা বিস্কুট লৈ আনিব।",
        ],
        Hindi: [
          "राज जी शाम को दफ्तर के बाद आपसे मिलने आ रहे हैं और आपके मनपसंद चाय बिस्कुट लाएँगे।",
        ],
        Bengali: [
          "রাজ আজ সন্ধ্যায় কাজ শেষ করে আপনার সাথে দেখা করতে আসবেন এবং প্রিয় বিস্কুট নিয়ে আসবেন।",
        ],
        English: [
          "Raj is coming to visit you this evening right after work. He is bringing your favorite tea biscuits!",
        ],
        Bodo: [
          "राजा दिनै बेलासियाव नोंथांखौ लोगो हमनो फैगोन आरो बिस्कुट लागोन।",
        ],
        Manipuri: [
          "রাজনা ঙসি নুমিদাংদা অদোমগীদমক অপাম্বা বিস্কুট পুদুনা লাক্কনি।",
        ],
      },
    },
    {
      intent: "family_riya",
      keywords: ["riya", "granddaughter", "nati", "natini", "poti", "নাতিনী", "ৰিয়া", "रिया", "নাতনি", "নাতিন", "पोती", "নাতিনীয়েক"],
      responses: {
        Assamese: [
          "ৰিয়াই স্কুলৰ পৰা আহি বাৰাণ্ডাত আপোনাৰ ওচৰত বহিব। তেওঁ আপোনাক বিহু নাচ দেখুৱাব আৰু সাধু শুনিব।",
        ],
        Hindi: [
          "रिया स्कूल से लौटकर आपके पास आ रही है। वह आपके साथ बैठकर अपनी बातें और बिहू डांस दिखाएगी।",
        ],
        Bengali: [
          "রিয়া স্কুল থেকে ফিরে আপনার পাশে এসে বসবে এবং আপনাকে নাচ ও গান শোনাবে।",
        ],
        English: [
          "Granddaughter Riya is on her way home from school. She loves practicing Bihu dance and listening to your stories on the veranda.",
        ],
        Bodo: [
          "रिया फरायसालिफ्राय फैनानै नोंथांनि खाथियाव फैगोन।",
        ],
        Manipuri: [
          "রিয়ানা স্কুলদগী হল্লক্লগা অদোমগী নকন্দা ৱারী শানবা লাক্কনি।",
        ],
      },
    },
    {
      intent: "family_ananya",
      keywords: ["ananya", "daughter in law", "bouari", "bahu", "bou", "অনন্যা", "বোৱাৰী", "अनन्या", "বৌমা", "বহু"],
      responses: {
        Assamese: [
          "অনন্যা পাকঘৰত আপোনাৰ বাবে পুষ্টিকৰ দুপৰীয়াৰ আহাৰ আৰু সুগন্ধি তুলসী চাহ তৈয়াৰ কৰি আছে।",
        ],
        Hindi: [
          "अनन्या जी रसोई में आपके लिए स्वादिष्ट भोजन और ताज़ा तुलसी चाय तैयार कर रही हैं।",
        ],
        Bengali: [
          "অনন্যা রান্নাঘরে আপনার জন্য পুষ্টিকর খাবার ও তুলসী চা তৈরি করছেন।",
        ],
        English: [
          "Ananya is in the kitchen preparing a wholesome lunch and fresh warm tulsi tea for you.",
        ],
        Bodo: [
          "अनन्या संनाय खथायाव नोंथांनि थाखाय साहा आरो ओंखाम बानायगासिनो दं।",
        ],
        Manipuri: [
          "অনন্যানা চাফমদা অদোমগীদমক চা অমসুং চাক শাজিনবীয়রি।",
        ],
      },
    },
    {
      intent: "family_bhupen",
      keywords: ["bhupen", "husband", "girik", "pati", "swami", "ভূপেন", "স্বামী", "গিৰীয়েক", "भूपेन", "পতি", "স্বামী"],
      responses: {
        Assamese: [
          "স্বৰ্গীয় ভূপেন বৰুৱাৰ স্মৃতি আপোনাৰ হৃদয়ত সদায় সোণালী হৈ জিলিকি আছে। তেওঁৰ মৰম আৰু আশীৰ্বাদ সদায় আপোনাৰ লগত আছে।",
        ],
        Hindi: [
          "स्वर्गीय भूपेन बरुआ जी की प्यारी यादें और उनका आशीर्वाद सदैव आपके साथ हैं। उनका प्रेम सदा आपके हृदय में सुरक्षित है।",
        ],
        Bengali: [
          "ভূপেন বরুয়া মহাশয়ের স্নেহ ও আশীর্বাদ সর্বদা আপনার হৃদয়ে জাগ্রত আছে।",
        ],
        English: [
          "Late Bhupen Barua's loving memory and blessings are always with you, cherished deeply in your heart.",
        ],
        Bodo: [
          "भूपेन बरुआनि अननाय आरो गोसोखांथिआ नोंथांनि गोसोआव जोबोद समायनायै थागोन।",
        ],
        Manipuri: [
          "ভূপেন বরুৱাগী নীংশিংবা অমসুং থৌজাল অসি অদোমগী থম্মোয়দা মতম চুপ্পদা লৈরি।",
        ],
      },
    },
    {
      intent: "tea_drink",
      keywords: ["tea", "chai", "chah", "drink", "coffee", "water", "pani", "চাহ", "পানী", "চা", "পানি", "चाय", "पानी", "তুলসী", "साहा"],
      responses: {
        Assamese: [
          "অনন্যাই আপোনাৰ বাবে তুলসী আৰু আদাৰে সুগন্ধি গৰম অসম চাহ তৈয়াৰ কৰিছে। আহক আমি বাৰাণ্ডাত বহি একাপ চাহ খাওঁ।",
        ],
        Hindi: [
          "अनन्या जी ने आपके लिए तुलसी और अदरक वाली गरमागरम असम चाय तैयार की है। चलिए आराम से एक कप चाय पीते हैं।",
        ],
        Bengali: [
          "অনন্যা আপনার জন্য তুলসী পাতা দিয়ে তৈরি ধোঁয়া ওঠা আসাম চা বানিয়েছেন। চলুন এক কাপ চা খাওয়া যাক।",
        ],
        English: [
          "Ananya has prepared a fresh warm cup of Assam tea infused with tulsi. Would you like to take a warm relaxing sip?",
        ],
        Bodo: [
          "अनन्या नोंथांनि थाखाय गुदुं साहा बानायबाय।",
        ],
        Manipuri: [
          "অনন্যানা অদোমগীদমক মহাও লৈরবা অসম চা শাজিনবীরে।",
        ],
      },
    },
    {
      intent: "food_meal",
      keywords: ["food", "khana", "lunch", "dinner", "breakfast", "bhat", "ahar", "hungry", "ভাত", "আহাৰ", "খোৱা", "খাবার", "খিদে", "खाना", "भूख", "দুপুর", "दुपहर", "ओंखाम"],
      responses: {
        Assamese: [
          "দুপৰীয়াৰ আহাৰত গৰম ভাত, টেঙা মাছৰ জোল আৰু সতেজ শাক-পাচলি আছে। আপোনাৰ বাবে বৰ তৃপ্তিদায়ক হ'ব।",
        ],
        Hindi: [
          "दोपहर के भोजन में हल्का चावल, ताज़ा दाल और पौष्टिक सब्जियाँ तैयार हैं। थोड़ी देर में भोजन करते हैं।",
        ],
        Bengali: [
          "দুপুরের খাবারে গরম ভাত, সুস্বাদু তরকারি আর তাজা শাকসবজি তৈরি হচ্ছে।",
        ],
        English: [
          "Lunch includes warm rice, light broth, and fresh tender vegetables carefully prepared for your nourishment.",
        ],
        Bodo: [
          "ओंखाम संग्रायाव मोजां जामुं थियारि जाबाय।",
        ],
        Manipuri: [
          "চাক অমসুং নুংঙাইরবা মহাও লৈবা চীঞ্জাক শাজিনবীরে।",
        ],
      },
    },
    {
      intent: "medicine_health",
      keywords: ["medicine", "medicines", "tablet", "dorob", "oushodh", "dawai", "pill", "bp", "দৰব", "ঔষধ", "বড়ি", "दवाई", "दवा", "मुलि", "হিদাক"],
      responses: {
        Assamese: [
          "ৰাতিপুৱাৰ ৰক্তচাপ আৰু স্মৃতিৰ দৰব খাই সম্পূৰ্ণ হৈছে। পৰৱৰ্তী ভিটামিন নিশা শুৱাৰ সময়ত এগিলাচ কুহুমীয়া গাখীৰৰ সৈতে খাব।",
        ],
        Hindi: [
          "सुबह की ब्लड प्रेशर और मेमोरी की दवा पूरी हो चुकी है। रात की दवा सोने से पहले गर्म दूध के साथ लेंगे।",
        ],
        Bengali: [
          "সকালের প্রেসার এবং স্মৃতির ওষুধ নেওয়া হয়ে গেছে। রাতের ওষুধ দুধের সাথে খাওয়া হবে।",
        ],
        English: [
          "Your morning blood pressure and memory medication are completed. The nighttime vitamins will be taken with warm milk.",
        ],
        Bodo: [
          "फुंनि मुलि जाबाय। हरनि मुलिया गाखीरजों जागोन।",
        ],
        Manipuri: [
          "অয়ুক্কী হিদাক চারে। অহিংগী হিদাক্না শঙ্গোমগা লোয়ননা চানবনি।",
        ],
      },
    },
    {
      intent: "bihu_culture_song",
      keywords: ["bihu", "song", "dance", "culture", "geet", "sing", "gaan", "বিহু", "গীত", "গান", "নাচ", "গাওঁ", "बिहू", "गीत", "गाना", "खन्थाइ", "ঈশৈ"],
      responses: {
        Assamese: [
          "শুনক আইতা: 'অতিকৈ চেনেহৰ ৰঙালী বিহুটি, অতিকৈ চেনেহৰ বৰদৈচিলা...' মনত পৰেনে বাৰাণ্ডাত ৰিয়াই কেনেকৈ বিহু নাচিছিল?",
        ],
        Hindi: [
          "रंगाली बिहू की वह मधुर धुन और असम के लोकगीत कितने मनभावन हैं! आपकी यादों में वह उत्सव आज भी जीवंत है।",
        ],
        Bengali: [
          "রঙ্গালী বিহুর সেই সুর আর ঢাকের মিষ্টি তাল... মনে পড়ে বারান্দায় বসে রিয়ার সাথে বিহু নাচ দেখার আনন্দ?",
        ],
        English: [
          "Listening to traditional Rongali Bihu melodies brings so much warmth. Do you remember the veranda celebrations with the family?",
        ],
        Bodo: [
          "रोंगालि बिहुनि मोजां गोसोखांथिआ जोबोद समायना।",
        ],
        Manipuri: [
          "বিহুগী অপাম্বা ঈশৈ অমসুং জগোইগী মতমদু নীংশিংলিব্রা?",
        ],
      },
    },
    {
      intent: "anxiety_reassurance",
      keywords: ["afraid", "scared", "fear", "anxious", "worried", "lost", "nervous", "bhoy", "chinta", "osthir", "ভয়", "চিন্তা", "অস্থিৰ", "মনটো ভাল লগা নাই", "डर", "घबराहट", "चिंता", "ভয় করছে", "গিগ्लि"],
      responses: {
        Assamese: [
          "আইতা ❤️ একো ভয় নকৰিব। মই আপোনাৰ কাষতেই আছো আৰু আপোনাৰ ঘৰত সকলো আপোনাক মৰম কৰিবলৈ উপস্থিত আছে। গভীৰভাৱে উশাহ লওক।",
          "আপুনি সম্পূৰ্ণ সুৰক্ষিত আৰু শান্ত পৰিৱেশত আছে আইতা। মই আপোনাৰ হাত ধৰি আছো।",
        ],
        Hindi: [
          "दादी जी ❤️ बिल्कुल मत घबराइए। मैं आपके पास ही हूँ। आप अपने घर पर सुरक्षित हैं और परिवार आपके साथ है। गहरी सांस लीजिए।",
        ],
        Bengali: [
          "ঠাকুমা ❤️ একদম ভয় পাবেন না। আমি আপনার কাছেই আছি। আপনি নিজের বাড়িতে পুরোপুরি সুরক্ষিত ও শান্তিতে আছেন।",
        ],
        English: [
          "Do not worry at all, Aita ❤️ Take a slow, deep breath. You are safe in your comfortable home surrounded by caring family.",
        ],
        Bodo: [
          "आइ ❤️ गिखंनाङा, आं नोंथांनि लोगोनो दं। नोंथाङा न'आवनो दं।",
        ],
        Manipuri: [
          "ইমা ❤️ অদোম অকিবা পোকপীনু, ঐহাক অদোমগী নকন্দা লৈরি।",
        ],
      },
    },
    {
      intent: "walk_veranda_garden",
      keywords: ["walk", "garden", "veranda", "outside", "baranda", "phuloni", "stroll", "বাৰাণ্ডা", "ফুলনি", "খোজ", "বাগান", "ঘুরতে", "टहलना", "बगीचा", "बरामदा", "बरान्दा", "বরােন্দা"],
      responses: {
        Assamese: [
          "নিশ্চয় আইতা! বাৰাণ্ডাত ৰ'দ পৰিছে আৰু চৰাইৰ মাত শুনা গৈছে। লাহে লাহে খোজ কঢ়াটো আপোনাৰ মন আৰু স্বাস্থ্যৰ বাবে বৰ ভাল।",
        ],
        Hindi: [
          "हाँ दादी जी! बरामदे में सुहानी धूप और ताज़ी हवा में टहलना आपके मन और स्वास्थ्य के लिए बहुत लाभदायक रहेगा।",
        ],
        Bengali: [
          "অবশ্যই ঠাকুমা! বারান্দায় মিষ্টি রোদ আর পাখির ডাক শুনলে মন খুব ভালো হয়ে যাবে।",
        ],
        English: [
          "Certainly, Aita! A gentle walk on the sunny veranda to see the marigolds and fresh greenery is wonderful for your energy.",
        ],
        Bodo: [
          "बरान्दायाव थाबायनाया देहानि थाखায় जोबोद मोजां आइ।",
        ],
        Manipuri: [
          "বরােন্দাদা খোঙনা চৎপা অমসুং লৈরাং উবা অসি হকচাংগীদমক য়াম্না ফৈ।",
        ],
      },
    },
    {
      intent: "stories_memories",
      keywords: ["story", "stories", "memory", "majuli", "brahmaputra", "umananda", "silk", "sadhu", "kahani", "golpo", "সাধু", "ব্ৰহ্মপুত্ৰ", "মাজুলী", "গল্প", "कहानी", "माजुली", "ব্রহ্মপুত্র", "উমানন্দ"],
      responses: {
        Assamese: [
          "মনত পৰেনে আইতা, মাজুলীৰ সেই ঐতিহাসিক সত্ৰসমূহ আৰু ব্ৰহ্মপুত্ৰৰ বুকুত নাৱৰ শান্ত যাত্ৰা? সেই সোণালী দিনবোৰ কিমান সুন্দৰ আছিল!",
        ],
        Hindi: [
          "माजुली द्वीप की वह पावन मिट्टी और उमानंद मंदिर की सुंदर नाव यात्रा... वह असम की कितनी गौरवमयी और सुंदर स्मृति है!",
        ],
        Bengali: [
          "মাজুলী দ্বীপের সেই শান্ত পরিবেশ আর উমানন্দ মন্দিরের নৌকাবিহারের কথা মনে পড়লে মন আনন্দে ভরে ওঠে!",
        ],
        English: [
          "Do you recall the scenic boat ride to Umananda temple on the Brahmaputra and Majuli's serene pottery workshops? Such golden chapters of life!",
        ],
        Bodo: [
          "माजुलि द्वीप आरो ब्रह्मपुत्र दैमानि गोसोखांथिआ जोबोद समायना।",
        ],
        Manipuri: [
          "উমানন্দ মন্দির অমসুং ব্রহ্মপুত্র ঈচেলগী মতমদু নীংশিংলিব্রা? য়াম্না নুংঙাইবনি!",
        ],
      },
    },
    {
      intent: "sleep_rest_tired",
      keywords: ["sleep", "rest", "tired", "bed", "klanto", "toponi", "ghoom", "neend", "thak", "টোপনি", "ক্লান্ত", "জিৰণি", "ঘুম", "বিছানা", "नींद", "थक", "आराम", "তুমুং", "তুম্বা"],
      responses: {
        Assamese: [
          "যদি টোপনি ধৰিছে বা ভাগৰ লাগিছে, তেন্তে আপুনি বাৰাণ্ডাত বা বিচনাত আৰামেৰে জিৰণি লওক। মই আপোনাৰ কাষতেই পহৰা দি আছো।",
        ],
        Hindi: [
          "दादी जी, यदि आप थक गई हैं तो आराम से बिस्तर पर लेटकर विश्राम कीजिए। मैं यहीं आपके पास हूँ।",
        ],
        Bengali: [
          "ঠাকুমা, যদি ক্লান্তি লাগে তবে আরামে একটু বিশ্রাম নিন। আমি আপনার পাশেই আছি।",
        ],
        English: [
          "If you feel tired or sleepy, Aita, please relax comfortably. I will remain right here watching over you peacefully.",
        ],
        Bodo: [
          "नोंथाङा उन्दुथारनो गोसो दंबा गोजोनै उन्दुदो आइ।",
        ],
        Manipuri: [
          "ইমা, অপীকপা ফাউরবদি বরােন্দাদা পোথাবীয়ু।",
        ],
      },
    },
    {
      intent: "gratitude_praise",
      keywords: ["thank you", "thanks", "dhanyabad", "bhal", "good", "nice", "love", "morom", "dhanyavad", "ধন্যবাদ", "মৰম", "ভাল", "धन्यवाद", "बहुत अच्छा", "ভালোবাসা", "সালামত", "থাগৎচরি"],
      responses: {
        Assamese: [
          "ধন্যবাদ আইতা ❤️ আপোনাৰ মৰম আৰু আশীৰ্বাদেই মোৰ বাবে সকলো। আপোনাৰ লগত কথা পাতি মোৰ বৰ ভাল লাগে।",
        ],
        Hindi: [
          "बहुत-बहुत धन्यवाद दादी जी ❤️ आपका स्नेह और आशीर्वाद मेरे लिए सबसे अनमोल है।",
        ],
        Bengali: [
          "অনেক ধন্যবাদ ঠাকুমা ❤️ আপনার স্নেহ ও আশীর্বাদ আমার কাছে সেরা উপহার।",
        ],
        English: [
          "Thank you so much, Aita ❤️ Your warmth and smile make my day truly special.",
        ],
        Bodo: [
          "रोजा रोजा साबायखर आइ ❤️ नोंथांनि अननायानो गासै।",
        ],
        Manipuri: [
          "য়াম্না থাগৎচরি ইমা ❤️ অদোমগী থৌজালনা খ্বাইদগী মরুওই।",
        ],
      },
    },
  ],

  clinical_summary: {
    patient_id: 1,
    patient_name: "Aita Devi Barua",
    age: 74,
    primary_language: "Assamese (অসমীয়া)",
    clinical_stage: "Mild Cognitive Impairment (MCI) · GDS Stage 3",
    mini_cog_score: "3 / 5 (Mild Recall Latency)",
    adherence_rate: 85,
    memory_index: 68.5,
    attention_index: 74.0,
    executive_index: 71.2,
    speech_fluency_trend: "Slight hesitation during unstructured recall, highly responsive to melodic and visual cues",
    last_assessment_date: "August 20, 2026",
    attending_physician: "Dr. B. Barua, MD (Geriatrics, GMCH)",
    recommendations: [
      "Continue daily structured reminiscence with familiar family photographs & Bihu themes.",
      "Maintain consistent hydration reminders (min. 1.5L daily) and monitor evening sundowning symptoms.",
      "Encourage 10-15 minutes of low-stress auditory recognition games (temple bell, morning cuckoo).",
      "Next clinical geriatric checkup scheduled with Dr. B. Barua at GMCH on 15th next month.",
    ],
    recent_notes: [
      {
        id: 1,
        author_name: "Dr. B. Barua, MD",
        author_role: "Consultant Geriatrician, GMCH Guwahati",
        clinical_stage: "Amnestic MCI - GDS Stage 3",
        note_text: "Patient shows strong emotional recognition with granddaughter Riya and son Raj. Visual and auditory cues significantly accelerate memory recall. Continue daily memory exercises and maintain blood pressure regimen.",
        recommended_intervention: "Daily cognitive engagement (Level 1-2 adaptive), morning veranda walks, hydration reminders.",
        created_at: "Aug 20, 2026",
      },
    ],
  },

  metrics: {
    memory_recall_accuracy: 78,
    face_recognition_accuracy: 92,
    active_streak_days: 14,
    weekly_games_completed: 28,
  },

  trends: {
    7: [
      { label: "Mon", memory_accuracy: 82, recognition_accuracy: 94 },
      { label: "Tue", memory_accuracy: 80, recognition_accuracy: 92 },
      { label: "Wed", memory_accuracy: 79, recognition_accuracy: 90 },
      { label: "Thu", memory_accuracy: 76, recognition_accuracy: 88 },
      { label: "Fri", memory_accuracy: 74, recognition_accuracy: 85 },
      { label: "Sat", memory_accuracy: 72, recognition_accuracy: 84 },
      { label: "Sun", memory_accuracy: 69, recognition_accuracy: 82 },
    ],
    30: [
      { label: "W1", memory_accuracy: 84, recognition_accuracy: 92 },
      { label: "W2", memory_accuracy: 81, recognition_accuracy: 89 },
      { label: "W3", memory_accuracy: 76, recognition_accuracy: 86 },
      { label: "W4", memory_accuracy: 71, recognition_accuracy: 83 },
    ],
    90: [
      { label: "M1", memory_accuracy: 86, recognition_accuracy: 94 },
      { label: "M2", memory_accuracy: 80, recognition_accuracy: 88 },
      { label: "M3", memory_accuracy: 72, recognition_accuracy: 82 },
    ],
  },

  timeline: [
    { icon: "🌅", title: "Morning Routine", detail: "Morning tea & Tulsi prayer completed", occurred_at: "07:30 AM" },
    { icon: "💊", title: "Medication Taken", detail: "Donepezil 5mg + Amlodipine 5mg", occurred_at: "08:35 AM" },
    { icon: "🧠", title: "Memory Activity", detail: "Accuracy: 85% · AI Level 2 Standard", occurred_at: "10:32 AM" },
    { icon: "🗣", title: "Voice Conversation", detail: "Assamese · Comforting conversation with Saarthi", occurred_at: "10:40 AM" },
    { icon: "🧩", title: "Family Puzzle", detail: "Bihu Festival Photo completed in 45 seconds", occurred_at: "11:15 AM" },
  ],

  alerts: [
    {
      id: 1,
      severity: "needs_attention",
      title: "Delayed Recall Latency",
      evidence: "Aita took 12.4s longer to recall granddaughter Riya's name during morning card session compared to 7-day average (3.2s).",
      ai_observation: "Potential mild fatigue or routine deviation. No signs of acute disorientation detected.",
      suggested_action: "Ensure adequate hydration, offer warm tea, and verify morning blood pressure medication.",
      acknowledged: false,
      created_at: "Today, 10:45 AM",
    },
  ],
};
