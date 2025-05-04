const AboutPage = () => {
  return (
    <section className="flex-1 pt-8 pb-20 md:pt-5 md:pb-10 bg-gradient-main overflow-x-clip">
      <div className="section-container">
        <div className="md:flex items-center">
          <div>
            <h1 className="text-center text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#595959] text-transparent bg-clip-text">
              About Us
            </h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6">
              Welcome to Special Project, your gateway to exploring the
              breathtaking beauty of Ukraine through unforgettable hiking
              adventures. Our mission is to connect travelers with the stunning
              landscapes, rich culture, and warm hospitality that Ukraine has to
              offer.
            </p>
            <h2 className="text-3xl font-bold mt-8">Who We Are</h2>
            <p className="text-xl text-[#010D3E] tracking-tight mt-4">
              Founded by a team of passionate outdoor enthusiasts and local
              experts, Special Project is dedicated to showcasing the diverse
              natural wonders of Ukraine. From the majestic Carpathian Mountains
              to the serene coastline of the Black Sea, we create immersive
              hiking tours that allow you to experience the country’s hidden
              gems.
            </p>
            <h2 className="text-3xl font-bold mt-8">Our Philosophy</h2>
            <p className="text-xl text-[#010D3E] tracking-tight mt-4">
              At Special Project, we believe in sustainable travel and
              responsible tourism. We strive to minimize our impact on the
              environment while supporting local communities. Our tours are
              designed to promote eco-friendly practices and preserve the
              natural beauty of our landscapes for generations to come.
            </p>
            <h2 className="text-3xl font-bold mt-8">What We Offer</h2>
            <ul className="text-xl text-[#010D3E] tracking-tight mt-4 list-disc list-inside">
              <li>
                <strong>Guided Hiking Tours:</strong> Whether you're a seasoned
                hiker or a novice adventurer, we offer a range of tours suitable
                for all skill levels. Our knowledgeable guides will lead you
                through stunning trails, sharing insights about the local flora,
                fauna, and history along the way.
              </li>
              <li>
                <strong>Cultural Experiences:</strong> Immerse yourself in
                Ukrainian culture with opportunities to taste traditional
                cuisine, participate in local customs, and connect with the
                friendly people of Ukraine.
              </li>
              <li>
                <strong>Customized Adventures:</strong> We understand that every
                traveler is unique. Our team can tailor tours to fit your
                interests and preferences, ensuring a personalized experience
                that exceeds your expectations.
              </li>
            </ul>
            <h2 className="text-3xl font-bold mt-8">Join Us</h2>
            <p className="text-xl text-[#010D3E] tracking-tight mt-4">
              Explore the beauty of Ukraine with Special Project and create
              memories that will last a lifetime. Whether you're seeking
              adventure, tranquility, or a deeper understanding of this
              incredible country, we have the perfect hiking tour for you.
            </p>
            <p className="text-xl text-[#010D3E] tracking-tight mt-4">
              For more information, feel free to contact us at{' '}
              <a
                href="mailto:specialproject@gmail.com"
                className="text-blue-600 underline"
              >
                specialproject@gmail.com
              </a>{' '}
              or visit our website at{' '}
              <a
                href="https://specialproject.com.ua"
                className="text-blue-600 underline"
              >
                specialproject.com.ua
              </a>
              . We can't wait to see you on the trail!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
