const HelpPage = () => {
  return (
    <section className="flex-1 pt-8 pb-20 md:pt-5 md:pb-10 ] bg-gradient-main overflow-x-clip">
      <div className="section-container">
        <div className="md:flex items-center">
          <div>
            <h1 className="text-center mb-8 text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#595959] text-transparent bg-clip-text">
              Help & Support
            </h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6">
              Welcome to the Help Page of Special Project! We're here to assist
              you with any questions or concerns you may have regarding your
              hiking adventures in Ukraine.
            </p>

            <h2 className="text-3xl font-bold mt-8">
              Frequently Asked Questions
            </h2>

            <div className="mt-4">
              <h3 className="text-xl font-bold">1. How do I book a tour?</h3>
              <p className="text-xl text-[#010D3E] tracking-tight mt-2">
                You can book a tour directly through our website by selecting
                your desired adventure and following the booking process. If you
                need assistance, feel free to contact us at{' '}
                <a
                  href="mailto:specialproject@gmail.com"
                  className="text-blue-600 underline"
                >
                  specialproject@gmail.com
                </a>
                .
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-bold">
                2. What should I pack for a hiking tour?
              </h3>
              <p className="text-xl text-[#010D3E] tracking-tight mt-2">
                We recommend packing comfortable clothing, sturdy hiking shoes,
                a refillable water bottle, snacks, and personal items. Detailed
                packing lists are provided in your booking confirmation.
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-bold">
                3. Are your tours suitable for beginners?
              </h3>
              <p className="text-xl text-[#010D3E] tracking-tight mt-2">
                Yes! We offer tours for all skill levels, including beginners.
                Our guides are experienced and will ensure a safe and enjoyable
                experience for everyone.
              </p>
            </div>

            <h2 className="text-3xl font-bold mt-8">Contact Us</h2>
            <p className="text-xl text-[#010D3E] tracking-tight mt-4">
              If you have any further questions or need assistance, please reach
              out to us:
            </p>
            <ul className="text-xl text-[#010D3E] tracking-tight mt-2 list-disc list-inside">
              <li>
                Email:{' '}
                <a
                  href="mailto:specialproject@gmail.com"
                  className="text-blue-600 underline"
                >
                  specialproject@gmail.com
                </a>
              </li>
              <li>
                Website:{' '}
                <a
                  href="https://specialproject.com.ua"
                  className="text-blue-600 underline"
                >
                  specialproject.com.ua
                </a>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mt-8">Follow Us</h2>
            <p className="text-xl text-[#010D3E] tracking-tight mt-4">
              Stay connected and follow our adventures on social media for
              updates and special offers!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HelpPage
