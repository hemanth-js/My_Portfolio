// State variables
let selectedIngredients = [];
let favorites = [];
let useAPI = false;
let currentResults = [];

// Recipe Database with Indian recipes added
    // Original recipes
    // Complete Recipe Database with Images (All 90 Recipes)
const recipes = [
    {
        id: 1,
        title: "Classic Chicken Curry",
        ingredients: ["chicken", "onion", "tomato", "curry powder", "coconut milk", "garlic", "ginger"],
        instructions: ["Heat oil in a large pan and sauté chopped onions until golden", "Add minced garlic and ginger, cook for 1 minute", "Add chicken pieces and cook until browned", "Add chopped tomatoes and curry powder, stir well", "Pour in coconut milk and simmer for 20 minutes", "Season with salt and serve hot with rice"],
        cookingTime: 35,
        difficulty: "Medium",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500"
    },
    {
        id: 2,
        title: "Veggie Fried Rice",
        ingredients: ["rice", "carrot", "peas", "onion", "soy sauce", "eggs", "garlic"],
        instructions: ["Cook rice and let it cool completely", "Heat oil in a wok, scramble eggs and set aside", "Sauté garlic and onion until fragrant", "Add diced carrots and peas, stir-fry for 3 minutes", "Add cooled rice and soy sauce, toss everything together", "Mix in scrambled eggs and serve hot"],
        cookingTime: 20,
        difficulty: "Easy",
        cuisine: "Asian",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500"
    },
    {
        id: 3,
        title: "Tomato Basil Pasta",
        ingredients: ["pasta", "tomato", "basil", "garlic", "olive oil", "parmesan"],
        instructions: ["Boil pasta according to package instructions", "Heat olive oil and sauté minced garlic", "Add diced tomatoes and cook until soft", "Toss in cooked pasta and fresh basil", "Top with grated parmesan cheese", "Serve immediately with extra basil"],
        cookingTime: 15,
        difficulty: "Easy",
        cuisine: "Italian",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500"
    },
    {
        id: 4,
        title: "Beef Tacos",
        ingredients: ["beef", "tortilla", "lettuce", "tomato", "cheese", "onion", "salsa"],
        instructions: ["Brown ground beef in a pan with taco seasoning", "Warm tortillas in another pan", "Chop lettuce, tomatoes, and onions", "Assemble tacos with beef as the base", "Top with lettuce, tomatoes, cheese, and salsa", "Serve with lime wedges"],
        cookingTime: 25,
        difficulty: "Easy",
        cuisine: "Mexican",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500"
    },
    {
        id: 5,
        title: "Mushroom Risotto",
        ingredients: ["rice", "mushroom", "onion", "garlic", "white wine", "parmesan", "butter"],
        instructions: ["Sauté sliced mushrooms in butter until golden, set aside", "In the same pan, cook onion and garlic until soft", "Add arborio rice and toast for 2 minutes", "Add white wine and stir until absorbed", "Gradually add warm stock, stirring constantly", "Mix in mushrooms, parmesan, and butter before serving"],
        cookingTime: 40,
        difficulty: "Hard",
        cuisine: "Italian",
        image: "https://images.unsplash.com/photo-1476124369491-c7addf2dd4b6?w=500"
    },
    {
        id: 6,
        title: "Greek Salad",
        ingredients: ["tomato", "cucumber", "onion", "olives", "feta cheese", "olive oil", "lemon"],
        instructions: ["Chop tomatoes, cucumbers, and onions into chunks", "Add sliced olives and crumbled feta cheese", "Drizzle with olive oil and fresh lemon juice", "Season with oregano, salt, and pepper", "Toss gently and let sit for 5 minutes", "Serve chilled as a refreshing side dish"],
        cookingTime: 10,
        difficulty: "Easy",
        cuisine: "Greek",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500"
    },
    {
        id: 7,
        title: "Chicken Stir Fry",
        ingredients: ["chicken", "broccoli", "carrot", "bell pepper", "soy sauce", "garlic", "ginger"],
        instructions: ["Cut chicken into bite-sized pieces", "Heat oil in wok and cook chicken until browned", "Add minced garlic and ginger, stir for 30 seconds", "Add chopped vegetables and stir-fry for 5 minutes", "Pour in soy sauce and cook for 2 more minutes", "Serve hot over rice or noodles"],
        cookingTime: 20,
        difficulty: "Easy",
        cuisine: "Asian",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500"
    },
    {
        id: 8,
        title: "Margherita Pizza",
        ingredients: ["pizza dough", "tomato", "mozzarella", "basil", "olive oil", "garlic"],
        instructions: ["Roll out pizza dough to desired thickness", "Spread crushed tomatoes mixed with garlic", "Add sliced fresh mozzarella evenly", "Drizzle with olive oil", "Bake at 450°F for 12-15 minutes", "Top with fresh basil leaves and serve"],
        cookingTime: 25,
        difficulty: "Medium",
        cuisine: "Italian",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500"
    },
    {
        id: 9,
        title: "Egg Fried Rice",
        ingredients: ["rice", "eggs", "peas", "carrot", "soy sauce", "green onion"],
        instructions: ["Use day-old cooked rice for best results", "Scramble eggs in a hot wok and set aside", "Stir-fry peas and diced carrots", "Add rice and break up any clumps", "Mix in scrambled eggs and soy sauce", "Garnish with chopped green onions"],
        cookingTime: 15,
        difficulty: "Easy",
        cuisine: "Asian",
        image: "https://images.unsplash.com/photo-1512003867696-6d5ce6835040?w=500"
    },
    {
        id: 10,
        title: "Caprese Salad",
        ingredients: ["tomato", "mozzarella", "basil", "olive oil", "balsamic vinegar"],
        instructions: ["Slice tomatoes and mozzarella into rounds", "Arrange alternating slices on a plate", "Tuck fresh basil leaves between slices", "Drizzle with quality olive oil", "Add a splash of balsamic vinegar", "Season with salt and pepper"],
        cookingTime: 5,
        difficulty: "Easy",
        cuisine: "Italian",
        image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=500"
    },
    {
        id: 11,
        title: "Salmon Teriyaki",
        ingredients: ["salmon", "soy sauce", "honey", "ginger", "garlic", "sesame seeds", "rice"],
        instructions: ["Mix soy sauce, honey, minced ginger and garlic for marinade", "Marinate salmon for 15 minutes", "Pan-sear salmon skin side down for 4 minutes", "Flip and cook for another 3 minutes", "Brush with remaining marinade", "Serve with rice and sprinkle sesame seeds"],
        cookingTime: 30,
        difficulty: "Medium",
        cuisine: "Japanese",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500"
    },
    {
        id: 12,
        title: "Butter Chicken",
        ingredients: ["chicken", "butter", "cream", "tomato", "onion", "garlic", "garam masala", "ginger"],
        instructions: ["Marinate chicken in yogurt and spices for 1 hour", "Grill or pan-fry chicken pieces until cooked", "Sauté onions, garlic, and ginger in butter", "Add tomato puree and spices, cook for 10 minutes", "Add cream and cooked chicken", "Simmer for 15 minutes and serve with naan"],
        cookingTime: 50,
        difficulty: "Medium",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500"
    },
    {
        id: 13,
        title: "Caesar Salad",
        ingredients: ["lettuce", "parmesan", "croutons", "olive oil", "lemon", "garlic", "anchovy"],
        instructions: ["Chop romaine lettuce into bite-sized pieces", "Make dressing with olive oil, lemon juice, garlic, and anchovy", "Toss lettuce with dressing", "Add grated parmesan cheese", "Top with homemade or store-bought croutons", "Serve immediately"],
        cookingTime: 10,
        difficulty: "Easy",
        cuisine: "American",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500"
    },
    {
        id: 14,
        title: "Pad Thai",
        ingredients: ["rice noodles", "shrimp", "eggs", "peanuts", "bean sprouts", "lime", "fish sauce", "tamarind"],
        instructions: ["Soak rice noodles in warm water for 20 minutes", "Stir-fry shrimp until pink, set aside", "Scramble eggs in the wok", "Add drained noodles and sauce (fish sauce, tamarind, sugar)", "Toss with shrimp, bean sprouts, and peanuts", "Serve with lime wedges"],
        cookingTime: 25,
        difficulty: "Medium",
        cuisine: "Thai",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500"
    },
    {
        id: 15,
        title: "Spaghetti Carbonara",
        ingredients: ["spaghetti", "bacon", "eggs", "parmesan", "black pepper", "garlic"],
        instructions: ["Cook spaghetti according to package directions", "Fry bacon until crispy, add minced garlic", "Beat eggs with grated parmesan", "Drain pasta and immediately toss with bacon", "Remove from heat and mix in egg mixture", "Add lots of black pepper and serve"],
        cookingTime: 20,
        difficulty: "Medium",
        cuisine: "Italian",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500"
    },
    {
        id: 16,
        title: "Vegetable Biryani",
        ingredients: ["rice", "potato", "carrot", "peas", "onion", "yogurt", "biryani masala", "mint"],
        instructions: ["Soak basmati rice for 30 minutes", "Fry onions until golden brown", "Add vegetables and yogurt with spices", "Layer partially cooked rice over vegetables", "Cover and cook on low heat for 20 minutes", "Garnish with fried onions and mint"],
        cookingTime: 60,
        difficulty: "Hard",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"
    },
    {
        id: 17,
        title: "Fish and Chips",
        ingredients: ["fish", "potato", "flour", "beer", "lemon", "salt", "oil"],
        instructions: ["Cut potatoes into thick fries", "Make batter with flour, beer, and salt", "Deep fry potatoes until golden", "Coat fish fillets in batter", "Deep fry fish until crispy", "Serve with lemon wedges and tartar sauce"],
        cookingTime: 35,
        difficulty: "Medium",
        cuisine: "British",
        image: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=500"
    },
    {
        id: 18,
        title: "Chicken Quesadilla",
        ingredients: ["tortilla", "chicken", "cheese", "bell pepper", "onion", "salsa", "sour cream"],
        instructions: ["Cook diced chicken with peppers and onions", "Place cheese and chicken on half a tortilla", "Fold tortilla and cook in a pan until golden", "Flip and cook other side until cheese melts", "Cut into wedges", "Serve with salsa and sour cream"],
        cookingTime: 15,
        difficulty: "Easy",
        cuisine: "Mexican",
        image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=500"
    },
    {
        id: 19,
        title: "Beef Stew",
        ingredients: ["beef", "potato", "carrot", "onion", "celery", "tomato paste", "beef broth", "thyme"],
        instructions: ["Brown beef cubes in a large pot", "Remove beef and sauté onions, carrots, and celery", "Add tomato paste and cook for 2 minutes", "Return beef to pot with broth and thyme", "Simmer for 1.5 hours", "Add potatoes and cook until tender"],
        cookingTime: 120,
        difficulty: "Medium",
        cuisine: "American",
        image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500"
    },
    {
        id: 20,
        title: "Pesto Pasta",
        ingredients: ["pasta", "basil", "pine nuts", "parmesan", "garlic", "olive oil"],
        instructions: ["Cook pasta until al dente", "Blend basil, pine nuts, garlic, and parmesan", "Slowly add olive oil while blending", "Drain pasta and reserve some pasta water", "Toss pasta with pesto, adding pasta water if needed", "Serve with extra parmesan"],
        cookingTime: 15,
        difficulty: "Easy",
        cuisine: "Italian",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500"
    },
    {
        id: 21,
        title: "Chicken Alfredo",
        ingredients: ["chicken", "fettuccine", "cream", "butter", "parmesan", "garlic"],
        instructions: ["Cook fettuccine according to package", "Season and cook chicken breast until done", "Melt butter and sauté garlic", "Add cream and bring to simmer", "Stir in parmesan until smooth", "Toss pasta and sliced chicken with sauce"],
        cookingTime: 25,
        difficulty: "Medium",
        cuisine: "Italian",
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500"
    },
    {
        id: 22,
        title: "Falafel Wrap",
        ingredients: ["chickpeas", "onion", "garlic", "parsley", "cumin", "pita bread", "tahini", "lettuce"],
        instructions: ["Blend chickpeas with onion, garlic, parsley, and spices", "Form into small balls", "Deep fry until golden brown", "Warm pita bread", "Fill with falafel, lettuce, tomatoes", "Drizzle with tahini sauce"],
        cookingTime: 30,
        difficulty: "Medium",
        cuisine: "Middle Eastern",
        image: "https://images.unsplash.com/photo-1593115057322-e94b77572f20?w=500"
    },
    {
        id: 23,
        title: "Shrimp Scampi",
        ingredients: ["shrimp", "pasta", "garlic", "butter", "white wine", "lemon", "parsley"],
        instructions: ["Cook linguine until al dente", "Sauté garlic in butter", "Add shrimp and cook until pink", "Pour in white wine and lemon juice", "Toss with cooked pasta", "Garnish with fresh parsley"],
        cookingTime: 20,
        difficulty: "Easy",
        cuisine: "Italian",
        image: "https://images.unsplash.com/photo-1633964913295-ceb43826e36f?w=500"
    },
    {
        id: 24,
        title: "Chicken Fajitas",
        ingredients: ["chicken", "bell pepper", "onion", "tortilla", "lime", "cumin", "chili powder"],
        instructions: ["Slice chicken into strips and marinate with spices", "Slice peppers and onions", "Cook chicken in hot skillet", "Add vegetables and cook until tender", "Warm tortillas", "Serve with lime wedges and toppings"],
        cookingTime: 20,
        difficulty: "Easy",
        cuisine: "Mexican",
        image: "https://images.unsplash.com/photo-1599974579688-8dbdd335a6d3?w=500"
    },
    {
        id: 25,
        title: "Minestrone Soup",
        ingredients: ["beans", "pasta", "tomato", "carrot", "celery", "onion", "garlic", "spinach"],
        instructions: ["Sauté onion, carrot, and celery", "Add garlic and cook for 1 minute", "Pour in vegetable broth and diced tomatoes", "Add beans and small pasta", "Simmer for 20 minutes", "Stir in fresh spinach before serving"],
        cookingTime: 35,
        difficulty: "Easy",
        cuisine: "Italian",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500"
    },
    {
        id: 26,
        title: "Beef Burger",
        ingredients: ["beef", "bun", "lettuce", "tomato", "cheese", "onion", "ketchup", "mustard"],
        instructions: ["Form ground beef into patties", "Season with salt and pepper", "Grill or pan-fry patties until cooked", "Toast buns", "Assemble with lettuce, tomato, cheese, and condiments", "Serve hot"],
        cookingTime: 20,
        difficulty: "Easy",
        cuisine: "American",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
    },
    {
        id: 27,
        title: "Chicken Caesar Wrap",
        ingredients: ["chicken", "tortilla", "lettuce", "parmesan", "caesar dressing", "croutons"],
        instructions: ["Cook and slice chicken breast", "Chop lettuce and mix with dressing", "Add chicken, parmesan, and croutons", "Wrap in tortilla", "Cut in half and serve"],
        cookingTime: 15,
        difficulty: "Easy",
        cuisine: "American",
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500"
    },
    {
        id: 28,
        title: "Vegetable Curry",
        ingredients: ["potato", "carrot", "peas", "onion", "tomato", "curry powder", "coconut milk", "garlic"],
        instructions: ["Sauté onions and garlic", "Add vegetables and cook for 5 minutes", "Add curry powder and tomatoes", "Pour in coconut milk", "Simmer until vegetables are tender", "Serve with rice"],
        cookingTime: 30,
        difficulty: "Medium",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500"
    },
    {
        id: 29,
        title: "Shakshuka",
        ingredients: ["eggs", "tomato", "onion", "bell pepper", "cumin", "paprika", "olive oil"],
        instructions: ["Sauté onions and peppers in olive oil", "Add tomatoes and spices", "Simmer for 10 minutes", "Crack eggs into the sauce", "Cover and cook until eggs are set", "Serve with bread"],
        cookingTime: 25,
        difficulty: "Easy",
        cuisine: "Middle Eastern",
        image: "https://images.unsplash.com/photo-1587565443916-5c8e462d5d78?w=500"
    },
    {
        id: 30,
        title: "Pancakes",
        ingredients: ["flour", "milk", "eggs", "sugar", "baking powder", "butter", "maple syrup"],
        instructions: ["Mix dry ingredients", "Whisk in milk and eggs", "Heat butter in a pan", "Pour batter and cook until bubbles form", "Flip and cook other side", "Serve with syrup"],
        cookingTime: 15,
        difficulty: "Easy",
        cuisine: "American",
        image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500"
    },
    {
        id: 31,
        title: "Tuna Salad",
        ingredients: ["tuna", "mayonnaise", "celery", "onion", "lettuce", "lemon"],
        instructions: ["Drain tuna and mix with mayo", "Add chopped celery and onion", "Season with lemon juice", "Serve on lettuce leaves", "Add crackers if desired"],
        cookingTime: 10,
        difficulty: "Easy",
        cuisine: "American",
        image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=500"
    },
    {
        id: 32,
        title: "Stuffed Peppers",
        ingredients: ["bell pepper", "rice", "beef", "onion", "tomato", "cheese", "garlic"],
        instructions: ["Cook rice and ground beef with onions", "Mix with tomatoes and garlic", "Stuff into halved peppers", "Top with cheese", "Bake at 375°F for 30 minutes"],
        cookingTime: 45,
        difficulty: "Medium",
        cuisine: "American",
        image: "https://images.unsplash.com/photo-1617343267582-2dce4d5e7bbf?w=500"
    },
    {
        id: 33,
        title: "French Toast",
        ingredients: ["bread", "eggs", "milk", "cinnamon", "butter", "maple syrup"],
        instructions: ["Whisk eggs, milk, and cinnamon", "Dip bread slices in mixture", "Cook in buttered pan until golden", "Flip and cook other side", "Serve with syrup"],
        cookingTime: 10,
        difficulty: "Easy",
        cuisine: "French",
        image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500"
    },
    {
        id: 34,
        title: "Lentil Soup",
        ingredients: ["lentils", "carrot", "celery", "onion", "tomato", "garlic", "thyme"],
        instructions: ["Sauté vegetables and garlic", "Add lentils and tomatoes", "Pour in broth and thyme", "Simmer for 30 minutes", "Blend if desired", "Serve hot"],
        cookingTime: 40,
        difficulty: "Easy",
        cuisine: "Mediterranean",
        image: "https://images.unsplash.com/photo-1588566565463-180a5b2090d2?w=500"
    },
    {
        id: 35,
        title: "Chicken Pot Pie",
        ingredients: ["chicken", "potato", "carrot", "peas", "onion", "flour", "milk", "pie crust"],
        instructions: ["Cook chicken and vegetables", "Make sauce with flour and milk", "Combine in pie dish", "Top with crust", "Bake at 400°F for 30 minutes"],
        cookingTime: 60,
        difficulty: "Medium",
        cuisine: "American",
        image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=500"
    },
    {
        id: 36,
        title: "Greek Yogurt Parfait",
        ingredients: ["yogurt", "berries", "honey", "granola", "nuts"],
        instructions: ["Layer yogurt in a glass", "Add berries and granola", "Drizzle with honey", "Top with nuts", "Chill and serve"],
        cookingTime: 5,
        difficulty: "Easy",
        cuisine: "Greek",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500"
    },
    {
        id: 37,
        title: "Beef Stir Fry",
        ingredients: ["beef", "broccoli", "carrot", "soy sauce", "garlic", "ginger", "rice"],
        instructions: ["Slice beef thinly", "Stir-fry beef until browned", "Add vegetables and garlic", "Pour in soy sauce", "Cook until tender", "Serve over rice"],
        cookingTime: 20,
        difficulty: "Easy",
        cuisine: "Asian",
        image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500"
    },
    {
        id: 38,
        title: "Quinoa Salad",
        ingredients: ["quinoa", "cucumber", "tomato", "feta", "olive oil", "lemon", "mint"],
        instructions: ["Cook quinoa and cool", "Chop vegetables", "Mix with feta and herbs", "Dress with oil and lemon", "Toss and serve chilled"],
        cookingTime: 20,
        difficulty: "Easy",
        cuisine: "Mediterranean",
        image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=500"
    },
    {
        id: 39,
        title: "Mac and Cheese",
        ingredients: ["pasta", "cheese", "milk", "butter", "flour"],
        instructions: ["Cook pasta", "Make cheese sauce with butter, flour, milk", "Add cheese", "Mix with pasta", "Bake if desired"],
        cookingTime: 25,
        difficulty: "Easy",
        cuisine: "American",
        image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=500"
    },
    {
        id: 40,
        title: "Fruit Smoothie",
        ingredients: ["banana", "berries", "yogurt", "milk", "honey"],
        instructions: ["Blend all ingredients", "Add ice if desired", "Blend until smooth", "Pour into glass", "Serve immediately"],
        cookingTime: 5,
        difficulty: "Easy",
        cuisine: "American",
        image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500"
    },
    {
        id: 41,
        title: "Roast Chicken",
        ingredients: ["chicken", "potato", "carrot", "onion", "rosemary", "olive oil"],
        instructions: ["Season chicken with herbs", "Arrange vegetables around", "Drizzle with oil", "Roast at 400°F for 1 hour", "Rest and serve"],
        cookingTime: 70,
        difficulty: "Medium",
        cuisine: "American",
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500"
    },
    {
        id: 42,
        title: "Chocolate Chip Cookies",
        ingredients: ["flour", "butter", "sugar", "eggs", "chocolate chips", "vanilla"],
        instructions: ["Cream butter and sugars", "Add eggs and vanilla", "Mix in flour", "Fold in chocolate chips", "Bake at 350°F for 10 minutes"],
        cookingTime: 25,
        difficulty: "Easy",
        cuisine: "American",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500"
    },
    {
        id: 43,
        title: "Spinach and Feta Pie",
        ingredients: ["spinach", "feta", "onion", "eggs", "phyllo dough", "olive oil"],
        instructions: ["Sauté spinach and onions", "Mix with feta and eggs", "Layer phyllo in dish", "Add filling", "Bake at 375°F for 30 minutes"],
        cookingTime: 45,
        difficulty: "Medium",
        cuisine: "Greek",
        image: "https://images.unsplash.com/photo-1601000938259-9e92002320b2?w=500"
    },
    {
        id: 44,
        title: "Beef Tacos",
        ingredients: ["beef", "tortilla", "lettuce", "cheese", "salsa", "onion"],
        instructions: ["Cook ground beef", "Warm tortillas", "Fill with beef and toppings", "Add cheese and salsa", "Serve immediately"],
        cookingTime: 20,
        difficulty: "Easy",
        cuisine: "Mexican",
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500"
    },
    {
        id: 45,
        title: "Tomato Soup",
        ingredients: ["tomato", "onion", "garlic", "cream", "basil", "bread"],
        instructions: ["Sauté onions and garlic", "Add tomatoes and simmer", "Blend until smooth", "Add cream", "Serve with bread"],
        cookingTime: 30,
        difficulty: "Easy",
        cuisine: "American",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500"
    },
    {
        id: 46,
        title: "Grilled Cheese Sandwich",
        ingredients: ["bread", "cheese", "butter"],
        instructions: ["Butter bread slices", "Add cheese between", "Grill until golden", "Flip and cook other side", "Serve hot"],
        cookingTime: 10,
        difficulty: "Easy",
        cuisine: "American",
        image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=500"
    },
    {
        title: "Chicken Noodle Soup",
        ingredients: ["chicken", "noodles", "carrot", "celery", "onion", "broth"],
        instructions: ["Cook chicken in broth", "Add chopped vegetables", "Simmer for 20 minutes", "Add noodles", "Cook until tender"],
        cookingTime: 35,
        difficulty: "Easy",
        cuisine: "American",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500"
    },
    {
        id: 48,
        title: "Banana Bread",
        ingredients: ["banana", "flour", "sugar", "eggs", "butter", "baking soda"],
        instructions: ["Mash bananas", "Mix with wet ingredients", "Add dry ingredients", "Pour into loaf pan", "Bake at 350°F for 50 minutes"],
        cookingTime: 60,
        difficulty: "Easy",
        cuisine: "American",
        image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500"
    },
    {
        id: 49,
        title: "Eggplant Parmesan",
        ingredients: ["eggplant", "tomato sauce", "mozzarella", "parmesan", "basil"],
        instructions: ["Slice and fry eggplant", "Layer with sauce and cheese", "Bake at 375°F for 25 minutes", "Top with basil", "Serve hot"],
        cookingTime: 40,
        difficulty: "Medium",
        cuisine: "Italian",
        image: "https://images.unsplash.com/photo-1589010588553-46e8e7c21788?w=500"
    },
    {
        id: 50,
        title: "Berry Cobbler",
        ingredients: ["berries", "flour", "sugar", "butter", "milk"],
        instructions: ["Mix berries with sugar", "Make topping with flour and butter", "Pour over berries", "Bake at 375°F for 30 minutes", "Serve warm"],
        cookingTime: 40,
        difficulty: "Easy",
        cuisine: "American",
        image: "https://images.unsplash.com/photo-1588195538326-c5b1e5b027ab?w=500"
    },
    {
        id: 51,
        title: "Sushi Rolls",
        ingredients: ["rice", "nori", "fish", "cucumber", "avocado", "soy sauce", "wasabi"],
        instructions: ["Cook sushi rice and season with vinegar", "Lay nori on bamboo mat", "Spread rice on nori leaving edge", "Add fish, cucumber, and avocado", "Roll tightly using mat", "Slice into pieces and serve with soy sauce"],
        cookingTime: 45,
        difficulty: "Medium",
        cuisine: "Japanese",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500"
    },
    {
        id: 52,
        title: "Paella",
        ingredients: ["rice", "seafood", "chicken", "peas", "bell pepper", "saffron", "garlic"],
        instructions: ["Heat oil in paella pan", "Cook chicken and seafood", "Add garlic and vegetables", "Stir in rice and saffron", "Add broth and simmer", "Let rest before serving"],
        cookingTime: 50,
        difficulty: "Medium",
        cuisine: "Spanish",
        image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500"
    },
    {
        id: 53,
        title: "Borscht",
        ingredients: ["beet", "potato", "carrot", "onion", "cabbage", "beef", "sour cream"],
        instructions: ["Cook beef broth", "Add chopped vegetables", "Simmer until tender", "Add beets last", "Season with vinegar", "Serve with sour cream"],
        cookingTime: 90,
        difficulty: "Medium",
        cuisine: "Ukrainian",
        image: "https://images.unsplash.com/photo-1604908815453-7462d2a2240b?w=500"
    },
    {
        id: 54,
        title: "Kimchi Fried Rice",
        ingredients: ["rice", "kimchi", "eggs", "onion", "green onion", "sesame oil", "gochujang"],
        instructions: ["Cook rice and set aside", "Sauté kimchi and onion", "Add rice and mix", "Push aside and scramble eggs", "Mix everything with sesame oil", "Garnish with green onions"],
        cookingTime: 20,
        difficulty: "Easy",
        cuisine: "Korean",
        image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=500"
    },
    {
        id: 55,
        title: "Ratatouille",
        ingredients: ["eggplant", "zucchini", "bell pepper", "tomato", "onion", "garlic", "herbs"],
        instructions: ["Sauté onions and garlic", "Add eggplant and cook", "Add zucchini and peppers", "Stir in tomatoes", "Simmer with herbs", "Serve hot or cold"],
        cookingTime: 40,
        difficulty: "Easy",
        cuisine: "French",
        image: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=500"
    },
    {
        id: 56,
        title: "Lamb Curry",
        ingredients: ["lamb", "onion", "tomato", "curry powder", "coconut milk", "garlic", "ginger"],
        instructions: ["Brown lamb pieces", "Sauté onions, garlic, ginger", "Add curry powder and tomatoes", "Add lamb back in", "Pour coconut milk", "Simmer until tender"],
        cookingTime: 80,
        difficulty: "Medium",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500"
    },
    {
        id: 57,
        title: "Ceviche",
        ingredients: ["fish", "lime", "onion", "cilantro", "chili", "avocado", "tomato"],
        instructions: ["Cut fish into cubes", "Marinate in lime juice", "Add chopped vegetables", "Mix with cilantro", "Season with chili", "Chill and serve"],
        cookingTime: 30,
        difficulty: "Easy",
        cuisine: "Peruvian",
        image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500"
    },
    {
        id: 58,
        title: "Bibimbap",
        ingredients: ["rice", "beef", "spinach", "carrot", "mushroom", "egg", "gochujang"],
        instructions: ["Cook rice", "Stir-fry vegetables separately", "Cook beef with soy sauce", "Fry egg", "Arrange over rice", "Top with gochujang"],
        cookingTime: 35,
        difficulty: "Medium",
        cuisine: "Korean",
        image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=500"
    },
    {
        id: 59,
        title: "Miso Soup",
        ingredients: ["tofu", "seaweed", "miso paste", "green onion", "dashi"],
        instructions: ["Heat dashi broth", "Add miso paste", "Add cubed tofu", "Add seaweed", "Simmer briefly", "Garnish with green onions"],
        cookingTime: 10,
        difficulty: "Easy",
        cuisine: "Japanese",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500"
    },
    {
        id: 60,
        title: "Tiramisu",
        ingredients: ["mascarpone", "coffee", "ladyfingers", "eggs", "sugar", "cocoa"],
        instructions: ["Beat egg yolks with sugar", "Mix in mascarpone", "Dip ladyfingers in coffee", "Layer in dish", "Refrigerate overnight", "Dust with cocoa"],
        cookingTime: 20,
        difficulty: "Medium",
        cuisine: "Italian",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500"
    },
    {
        id: 61,
        title: "Pho",
        ingredients: ["beef", "rice noodles", "onion", "ginger", "star anise", "bean sprouts", "basil"],
        instructions: ["Roast bones for broth", "Add spices and simmer", "Cook noodles", "Slice beef thinly", "Assemble bowls", "Add fresh herbs"],
        cookingTime: 180,
        difficulty: "Hard",
        cuisine: "Vietnamese",
        image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=500"
    },
    {
        id: 62,
        title: "Baklava",
        ingredients: ["phyllo dough", "nuts", "butter", "honey", "cinnamon", "sugar"],
        instructions: ["Layer phyllo with butter", "Add nut mixture", "Cut into pieces", "Bake until golden", "Pour honey syrup", "Let soak"],
        cookingTime: 60,
        difficulty: "Medium",
        cuisine: "Turkish",
        image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500"
    },
    {
        id: 63,
        title: "Jerk Chicken",
        ingredients: ["chicken", "allspice", "scotch bonnet", "soy sauce", "brown sugar", "thyme", "garlic"],
        instructions: ["Blend marinade ingredients", "Marinate chicken", "Grill or bake", "Baste with marinade", "Cook until done", "Serve with sides"],
        cookingTime: 45,
        difficulty: "Medium",
        cuisine: "Jamaican",
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500"
    },
    {
        id: 64,
        title: "Pierogi",
        ingredients: ["flour", "potato", "onion", "butter", "cheese", "sour cream"],
        instructions: ["Make dough", "Prepare potato filling", "Roll and cut dough", "Fill and seal", "Boil pierogi", "Fry if desired"],
        cookingTime: 60,
        difficulty: "Medium",
        cuisine: "Polish",
        image: "https://images.unsplash.com/photo-1626266061368-46a8f578ddd6?w=500"
    },
    {
        id: 65,
        title: "Gazpacho",
        ingredients: ["tomato", "cucumber", "bell pepper", "onion", "garlic", "olive oil", "bread"],
        instructions: ["Blend all ingredients", "Chill for hours", "Adjust seasoning", "Serve cold", "Garnish with croutons"],
        cookingTime: 15,
        difficulty: "Easy",
        cuisine: "Spanish",
        image: "https://images.unsplash.com/photo-1541603183828-5f095c4fdc7a?w=500"
    },
    {
        id: 66,
        title: "Bao Buns",
        ingredients: ["flour", "yeast", "pork", "hoisin", "cucumber", "green onion"],
        instructions: ["Make dough and let rise", "Prepare pork filling", "Roll and steam buns", "Cook filling", "Assemble buns", "Serve warm"],
        cookingTime: 90,
        difficulty: "Hard",
        cuisine: "Chinese",
        image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=500"
    },
    {
        id: 67,
        title: "Shakshuka",
        ingredients: ["eggs", "tomato", "onion", "bell pepper", "cumin", "paprika", "feta"],
        instructions: ["Sauté vegetables", "Add spices and tomatoes", "Simmer sauce", "Crack eggs into sauce", "Cover and cook", "Top with feta"],
        cookingTime: 25,
        difficulty: "Easy",
        cuisine: "Israeli",
        image: "https://images.unsplash.com/photo-1587565443916-5c8e462d5d78?w=500"
    },
    {
        id: 68,
        title: "Risotto",
        ingredients: ["arborio rice", "mushroom", "onion", "white wine", "parmesan", "butter", "broth"],
        instructions: ["Sauté onions", "Add rice and toast", "Add wine and stir", "Gradually add broth", "Stir in mushrooms", "Finish with cheese"],
        cookingTime: 40,
        difficulty: "Medium",
        cuisine: "Italian",
        image: "https://images.unsplash.com/photo-1593560704563-f176a2eb61db?w=500"
    },
    {
        id: 69,
        title: "Empanadas",
        ingredients: ["flour", "beef", "onion", "egg", "raisins", "olive oil", "cumin"],
        instructions: ["Make dough", "Cook beef filling", "Roll dough", "Fill and fold", "Seal edges", "Bake until golden"],
        cookingTime: 50,
        difficulty: "Medium",
        cuisine: "Argentinian",
        image: "https://images.unsplash.com/photo-1601000938259-9e92002320b2?w=500"
    },
    {
        id: 70,
        title: "Poke Bowl",
        ingredients: ["fish", "rice", "avocado", "cucumber", "seaweed", "soy sauce", "sesame"],
        instructions: ["Cook rice", "Cube raw fish", "Marinate fish", "Chop vegetables", "Assemble bowl", "Drizzle with sauce"],
        cookingTime: 20,
        difficulty: "Easy",
        cuisine: "Hawaiian",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"
    },
    {
        id: 71,
        title: "Paneer Butter Masala",
        ingredients: ["paneer", "butter", "cream", "tomato", "onion", "garlic", "ginger", "cashew", "garam masala", "kasuri methi"],
        instructions: ["Blend tomatoes, cashews, and onions into smooth paste", "Heat butter and sauté ginger-garlic paste", "Add tomato-cashew paste and cook for 10 minutes", "Add garam masala, kasuri methi, and spices", "Add paneer cubes and cream", "Simmer for 5 minutes and garnish with cream"],
        cookingTime: 35,
        difficulty: "Medium",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500"
    },
    {
        id: 72,
        title: "Chole (Chickpea Curry)",
        ingredients: ["chickpeas", "onion", "tomato", "ginger", "garlic", "chole masala", "cumin", "coriander"],
        instructions: ["Soak chickpeas overnight and pressure cook", "Sauté onions, ginger, and garlic", "Add tomatoes and chole masala", "Add cooked chickpeas with water", "Simmer for 20 minutes", "Garnish with coriander and serve with bhature"],
        cookingTime: 45,
        difficulty: "Medium",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500"
    },
    {
        id: 73,
        title: "Palak Paneer",
        ingredients: ["paneer", "spinach", "onion", "tomato", "cream", "garlic", "ginger", "garam masala"],
        instructions: ["Blanch spinach and blend to paste", "Sauté onions, ginger, garlic", "Add tomatoes and cook until soft", "Add spinach paste and spices", "Add paneer cubes and cream", "Simmer for 5 minutes"],
        cookingTime: 30,
        difficulty: "Medium",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
    },
    {
        id: 74,
        title: "Biryani (Hyderabadi Style)",
        ingredients: ["rice", "chicken", "yogurt", "onion", "mint", "saffron", "biryani masala", "ghee"],
        instructions: ["Marinate chicken in yogurt and spices", "Parboil rice with whole spices", "Layer marinated chicken at bottom", "Add rice layer on top", "Sprinkle saffron milk and fried onions", "Dum cook on low heat for 30 minutes"],
        cookingTime: 90,
        difficulty: "Hard",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500"
    },
    {
        id: 75,
        title: "Dal Tadka",
        ingredients: ["toor dal", "onion", "tomato", "garlic", "ginger", "cumin", "turmeric", "ghee", "green chili"],
        instructions: ["Pressure cook dal with turmeric", "Prepare tadka with cumin, garlic, onions", "Add tomatoes and green chilies", "Pour tadka over cooked dal", "Simmer for 10 minutes", "Garnish with coriander"],
        cookingTime: 35,
        difficulty: "Easy",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=500"
    },
    {
        id: 76,
        title: "Aloo Gobi",
        ingredients: ["potato", "cauliflower", "onion", "tomato", "turmeric", "cumin", "coriander powder", "ginger"],
        instructions: ["Heat oil and add cumin seeds", "Sauté onions and ginger", "Add tomatoes and spices", "Add potato and cauliflower", "Cover and cook until tender", "Garnish with coriander"],
        cookingTime: 30,
        difficulty: "Easy",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1589010588553-46e8e7c21788?w=500"
    },
    {
        id: 77,
        title: "Butter Naan",
        ingredients: ["flour", "yogurt", "milk", "yeast", "sugar", "butter", "garlic"],
        instructions: ["Mix flour, yogurt, milk, yeast, and sugar", "Knead into soft dough and rest for 2 hours", "Divide into portions and roll out", "Cook on hot tawa until bubbles form", "Flip and cook other side", "Brush with butter and garlic"],
        cookingTime: 150,
        difficulty: "Medium",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500"
    },
    {
        id: 78,
        title: "Samosa",
        ingredients: ["potato", "peas", "flour", "cumin", "coriander", "garam masala", "green chili", "oil"],
        instructions: ["Make dough with flour and oil", "Prepare filling with mashed potatoes and peas", "Add spices and mix well", "Roll dough and cut into strips", "Fill and fold into triangles", "Deep fry until golden brown"],
        cookingTime: 60,
        difficulty: "Hard",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
    },
    {
        id: 79,
        title: "Rajma (Kidney Bean Curry)",
        ingredients: ["kidney beans", "onion", "tomato", "ginger", "garlic", "cumin", "coriander powder", "garam masala"],
        instructions: ["Soak kidney beans overnight and pressure cook", "Sauté onions, ginger, garlic", "Add tomatoes and spices", "Add cooked rajma with water", "Simmer for 20 minutes", "Serve with rice"],
        cookingTime: 50,
        difficulty: "Medium",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1593560704563-f176a2eb61db?w=500"
    },
    {
        id: 80,
        title: "Tandoori Chicken",
        ingredients: ["chicken", "yogurt", "tandoori masala", "ginger", "garlic", "lemon", "kasuri methi"],
        instructions: ["Make marinade with yogurt and spices", "Marinate chicken for 4 hours", "Preheat oven to 450°F", "Arrange chicken on baking tray", "Bake for 25-30 minutes", "Serve with mint chutney"],
        cookingTime: 270,
        difficulty: "Medium",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500"
    },
    {
        id: 81,
        title: "Dosa with Sambar",
        ingredients: ["rice", "urad dal", "toor dal", "tamarind", "drumstick", "onion", "tomato", "sambar powder"],
        instructions: ["Soak rice and urad dal, grind to batter", "Ferment batter overnight", "Cook sambar with dal and vegetables", "Heat tawa and spread dosa batter", "Cook until crispy and golden", "Serve hot with sambar"],
        cookingTime: 30,
        difficulty: "Hard",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=500"
    },
    {
        id: 82,
        title: "Pav Bhaji",
        ingredients: ["potato", "peas", "carrot", "cauliflower", "tomato", "onion", "pav bhaji masala", "butter", "pav bread"],
        instructions: ["Boil and mash all vegetables", "Heat butter and sauté onions", "Add tomatoes and pav bhaji masala", "Add mashed vegetables", "Cook for 15 minutes, adding butter", "Serve with toasted pav"],
        cookingTime: 40,
        difficulty: "Easy",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500"
    },
    {
        id: 83,
        title: "Idli with Coconut Chutney",
        ingredients: ["rice", "urad dal", "coconut", "green chili", "ginger", "mustard seeds", "curry leaves"],
        instructions: ["Soak rice and dal separately", "Grind to smooth batter and ferment", "Steam in idli molds", "Make chutney with coconut and spices", "Temper with mustard seeds", "Serve idli with chutney"],
        cookingTime: 25,
        difficulty: "Medium",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1589301773859-e62e9ddba656?w=500"
    },
    {
        id: 84,
        title: "Malai Kofta",
        ingredients: ["paneer", "potato", "cream", "cashew", "tomato", "onion", "garam masala", "kasuri methi"],
        instructions: ["Mix mashed paneer and potato, make balls", "Deep fry kofta balls", "Make gravy with tomato-cashew paste", "Add cream and spices", "Add koftas before serving", "Garnish with cream and kasuri methi"],
        cookingTime: 50,
        difficulty: "Hard",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
    },
    {
        id: 85,
        title: "Vada Pav",
        ingredients: ["potato", "gram flour", "green chili", "garlic", "turmeric", "pav bread", "tamarind chutney"],
        instructions: ["Make potato filling with spices", "Prepare gram flour batter", "Coat potato balls in batter", "Deep fry until golden", "Toast pav with butter", "Assemble with chutneys"],
        cookingTime: 35,
        difficulty: "Medium",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1626266061368-46a8f578ddd6?w=500"
    },
    {
        id: 86,
        title: "Gulab Jamun",
        ingredients: ["milk powder", "flour", "ghee", "sugar", "cardamom", "saffron", "rose water"],
        instructions: ["Mix milk powder and flour", "Knead with ghee and milk to soft dough", "Make small balls", "Deep fry on low heat until brown", "Prepare sugar syrup with cardamom", "Soak fried balls in warm syrup"],
        cookingTime: 45,
        difficulty: "Medium",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500"
    },
    {
        id: 87,
        title: "Masala Dosa",
        ingredients: ["rice", "urad dal", "potato", "onion", "mustard seeds", "curry leaves", "turmeric"],
        instructions: ["Prepare dosa batter and ferment", "Make potato masala with spices", "Heat tawa and spread batter thin", "Cook until crispy", "Add potato masala in center", "Fold and serve with chutney"],
        cookingTime: 30,
        difficulty: "Medium",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500"
    },
    {
        id: 88,
        title: "Chicken Tikka Masala",
        ingredients: ["chicken", "yogurt", "tikka masala", "cream", "tomato", "onion", "ginger", "garlic", "kasuri methi"],
        instructions: ["Marinate chicken in yogurt and tikka masala", "Grill or bake chicken pieces", "Make gravy with tomatoes and spices", "Add grilled chicken to gravy", "Add cream and kasuri methi", "Simmer and serve"],
        cookingTime: 60,
        difficulty: "Medium",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500"
    },
    {
        id: 89,
        title: "Aloo Paratha",
        ingredients: ["wheat flour", "potato", "onion", "green chili", "coriander", "cumin", "ghee"],
        instructions: ["Make dough with wheat flour", "Prepare spiced mashed potato filling", "Roll dough and add filling", "Seal and roll again", "Cook on tawa with ghee", "Serve hot with yogurt"],
        cookingTime: 30,
        difficulty: "Medium",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1590412200988-a436f704609e?w=500"
    },
    {
        id: 90,
        title: "Raita",
        ingredients: ["yogurt", "cucumber", "onion", "tomato", "cumin", "coriander", "mint"],
        instructions: ["Whisk yogurt until smooth", "Add finely chopped vegetables", "Add roasted cumin powder", "Mix in chopped mint and coriander", "Season with salt", "Chill before serving"],
        cookingTime: 10,
        difficulty: "Easy",
        cuisine: "Indian",
        image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=500"
    }
];

// Input handling
document.getElementById('ingredientInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addIngredient();
    }
});

// Storage functions - using in-memory storage only
function saveState() {
    // Note: localStorage removed as per Claude.ai artifact restrictions
    // State is maintained in memory during session
}

function loadState() {
    // Initialize with empty state
    selectedIngredients = [];
    favorites = [];
    useAPI = false;
}

function saveApiKey() {
    const key = document.getElementById('apiKeyInput').value.trim();
    alert('API key saved for this session.');
}

function clearFavorites() {
    if (!confirm('Clear all favorites?')) return;
    favorites = [];
    if (currentResults && currentResults.length) displayResults(currentResults);
}

function addIngredient() {
    const input = document.getElementById('ingredientInput');
    const ingredient = input.value.trim().toLowerCase();

    if (ingredient && !selectedIngredients.includes(ingredient)) {
        selectedIngredients.push(ingredient);
        updateIngredientDisplay();
        input.value = '';
    }
}

function removeIngredient(ingredient) {
    selectedIngredients = selectedIngredients.filter(i => i !== ingredient);
    updateIngredientDisplay();
}

function updateIngredientDisplay() {
    const container = document.getElementById('selectedIngredients');

    if (selectedIngredients.length === 0) {
        container.innerHTML = '<p style="color: #999;">No ingredients selected yet. Start typing to add some!</p>';
        return;
    }

    container.innerHTML = selectedIngredients.map(ingredient => `
        <div class="ingredient-tag">
            <span>${ingredient}</span>
            <span class="remove" onclick="removeIngredient('${ingredient}')">✕</span>
        </div>
    `).join('');
}

function toggleAPIMode() {
    useAPI = document.getElementById('useAPI').checked;
    const statusDiv = document.getElementById('apiStatus');
    if (useAPI) {
        statusDiv.textContent = 'API mode enabled - searching online recipes!';
        statusDiv.style.color = '#4ade80';
    } else {
        statusDiv.textContent = 'Using local recipes database.';
        statusDiv.style.color = '#666';
    }
}

async function searchRecipes() {
    if (selectedIngredients.length === 0) {
        alert('Please add at least one ingredient!');
        return;
    }

    if (useAPI) {
        const apiKey = document.getElementById('apiKeyInput').value.trim() || '63e4f973a9914869a4f378a8320ba24a';
        const ingredientsQuery = selectedIngredients.join(',');
        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredientsQuery)}&number=10&apiKey=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            const results = data.map(recipe => ({
                id: recipe.id,
                title: recipe.title,
                ingredients: recipe.usedIngredients.map(ing => ing.name).concat(recipe.missedIngredients.map(ing => ing.name)),
                instructions: [],
                cookingTime: recipe.readyInMinutes || 30,
                difficulty: 'Unknown',
                cuisine: 'Unknown',
                image: recipe.image,
                matchPercentage: Math.round((recipe.usedIngredientCount / (recipe.usedIngredientCount + recipe.missedIngredientCount)) * 100)
            }));

            displayResults(results);
        } catch (error) {
            console.error('API Error:', error);
            alert('Failed to fetch recipes from API. Falling back to local database.');
            searchLocalRecipes();
        }
    } else {
        searchLocalRecipes();
    }
}

function searchLocalRecipes() {
    const results = recipes.map(recipe => {
        const matchCount = recipe.ingredients.filter(ing =>
            selectedIngredients.some(selected =>
                ing.toLowerCase().includes(selected.toLowerCase())
            )
        ).length;

        const matchPercentage = Math.round((matchCount / recipe.ingredients.length) * 100);

        return {
            ...recipe,
            matchCount,
            matchPercentage
        };
    })
    .filter(recipe => recipe.matchCount > 0)
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

    displayResults(results);
}

function surpriseMe() {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    displayResults([{...randomRecipe, matchPercentage: 100, matchCount: randomRecipe.ingredients.length}]);
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function getRandomRecipes() {
    const shuffled = shuffleArray(recipes);
    const randomRecipes = shuffled.map(recipe => ({
        ...recipe,
        matchPercentage: 100,
        matchCount: recipe.ingredients.length
    }));
    displayResults(randomRecipes);
}

function displayResults(results) {
    currentResults = results;
    const container = document.getElementById('results');

    if (results.length === 0) {
        container.innerHTML = '<div class="no-results">No recipes found with those ingredients. Try different combinations!</div>';
        return;
    }

    container.innerHTML = results.map(recipe => `
        <div class="recipe-card" onclick="showRecipeDetails(${recipe.id})">
            <div class="recipe-image" style="${recipe.image ? `background-image: url('${recipe.image}'); background-size: cover; background-position: center;` : ''}"></div>
            <div class="recipe-content">
                <button title="Toggle favorite" aria-label="Toggle favorite" class="favorite-btn ${favorites.includes(recipe.id) ? 'active' : ''}"
                        onclick="toggleFavorite(event, ${recipe.id})">
                    ${favorites.includes(recipe.id) ? '❤️' : '🤍'}
                </button>
                <h3 class="recipe-title">${recipe.title}</h3>
                <div class="recipe-meta">
                    <span>⏱️ ${recipe.cookingTime} min</span>
                    <span>📊 ${recipe.difficulty}</span>
                    <span>🌍 ${recipe.cuisine}</span>
                </div>
                <span class="match-badge">${recipe.matchPercentage}% Match</span>
                <div class="recipe-ingredients">
                    <strong>Ingredients:</strong> ${Array.isArray(recipe.ingredients) ? recipe.ingredients.slice(0, 4).join(', ') : ''}${Array.isArray(recipe.ingredients) && recipe.ingredients.length > 4 ? '...' : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function showRecipeDetails(recipeId) {
    const recipe = currentResults.find(r => r.id === recipeId) || recipes.find(r => r.id === recipeId);
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h2 class="modal-title">${recipe.title}</h2>
        
        <div class="recipe-meta" style="justify-content: center; margin-bottom: 30px;">
            <span>⏱️ ${recipe.cookingTime} min</span>
            <span>📊 ${recipe.difficulty}</span>
            <span>🌍 ${recipe.cuisine}</span>
        </div>

        <div class="modal-section">
            <h3>🛒 Ingredients</h3>
            <ul>
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-section">
            <h3>👨‍🍳 Instructions</h3>
            <ol class="instructions-list">
                ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
            </ol>
        </div>
    `;

    document.getElementById('recipeModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('recipeModal').style.display = 'none';
}

function toggleFavorite(event, recipeId) {
    if (event && typeof event.stopPropagation === 'function') event.stopPropagation();

    if (favorites.includes(recipeId)) {
        favorites = favorites.filter(id => id !== recipeId);
    } else {
        favorites.push(recipeId);
    }

    if (currentResults && currentResults.length > 0) {
        displayResults(currentResults);
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('recipeModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Initialize
loadState();
updateIngredientDisplay();
document.getElementById('useAPI').checked = useAPI;
document.getElementById('apiStatus').textContent = useAPI ? 'API mode enabled - searching online recipes!' : 'Using local recipes database.';