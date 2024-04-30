const sampleBooks = [
  {
    title: "The Catcher in the Rye",
    description:
      "The Catcher in the Rye is a novel by J. D. Salinger, narrated by the protagonist, Holden Caulfield. The story is about Holden's experiences in New York City in the days following his expulsion from Pencey Prep.",
    author: "J. D. Salinger",
    price: 200,
    image: {
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
      filename: "book image"
    },
    location: "New York, USA",
    contact: 9876543210,
  },
  {
    title: "Pride and Prejudice",
    description:
      "Pride and Prejudice is a romantic novel by Jane Austen, first published in 1813. The story follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry of early 19th-century England.",
    author: "Jane Austen",
    price:  200,
    image: {
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
      filename: "book image"
    },
    location: "Hertfordshire, UK",
    contact: 9876543210,
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    description:
      "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday.",
    author: "J. K. Rowling",
    price:  200,
    image: {
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
      filename: "book image"
    },
    location: "London, UK",
    contact: 9876543210,
  },
  {
    title: "The Hobbit",
    description:
      "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It follows the quest of the home-loving hobbit Bilbo Baggins who is persuaded by the wizard Gandalf to set out on an adventure with a group of dwarves.",
    author: "J. R. R. Tolkien",
    price: 200,
    image: {
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
      filename: "book image"
    },
    location: "Middle-earth",
    contact: 9876543210,
  },
  {
    title: "The Da Vinci Code",
    description:
      "The Da Vinci Code is a mystery thriller novel by Dan Brown. The story follows symbologist Robert Langdon and cryptologist Sophie Neveu after a murder in the Louvre Museum in Paris, leading to a trail of clues found in the works of Leonardo da Vinci.",
    author: "Dan Brown",
    price:  200,
    image: {
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
      filename: "book image"
    },
    location: "Paris, France",
    contact: 9876543210,
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    description:
      "The Fellowship of the Ring is the first of three volumes of the epic novel The Lord of the Rings by J. R. R. Tolkien. The story begins in the Shire, where the hobbit Frodo Baggins inherits the Ring from Bilbo Baggins.",
    author: "J. R. R. Tolkien",
    price:  200,
    image: {
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
      filename: "book image"
    },
    location: "Middle-earth",
    contact: 9876543210,
  },
  {
    title: "The Great Gatsby",
    description:
      "The Great Gatsby is a novel by American author F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    author: "F. Scott Fitzgerald",
    price: 200,
    image: {
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
      filename: "book image"
    },
    location: "New York, USA",
    contact: 9876543210,
  },
  {
    title: "Moby-Dick; or, The Whale",
    description:
      "Moby-Dick; or, The Whale is an 1851 novel by American writer Herman Melville. The narrative is told by Ishmael, a sailor who joins the whaling ship Pequod, commanded by Captain Ahab, who is on a quest for revenge against the giant white sperm whale Moby Dick.",
    author: "Herman Melville",
    price:  200,
    image: {
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
      filename: "book image"
    },
    location: "Nantucket, Massachusetts, USA",
    contact: 9876543210,
  },
  {
    title: "Frankenstein; or, The Modern Prometheus",
    description:
      "Frankenstein; or, The Modern Prometheus is a novel written by English author Mary Shelley. The story follows Victor Frankenstein, a young scientist who creates a sapient creature in an unorthodox scientific experiment.",
    author: "Mary Shelley",
    price:  200,
    image: {
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
      filename: "book image"
    },
    location: "Geneva, Switzerland",
    contact: 9876543210,
  },
  {
    title: "The Adventures of Sherlock Holmes",
    description:
      "The Adventures of Sherlock Holmes is a collection of twelve short stories by Arthur Conan Doyle, featuring his fictional detective Sherlock Holmes. The stories are adventures of Holmes and his friend Dr. Watson, who help solve various mysteries.",
    author: "Arthur Conan Doyle",
    price: 200,
    image: {
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
      filename: "book image"
    },
    location: "London, UK",
    contact: 9876543210,
  },
  // Repeat this structure for each book object
];

module.exports = { data: sampleBooks };
