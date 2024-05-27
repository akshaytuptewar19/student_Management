import React from "react";
import akshay from "../../assets/images/ak.jpeg";
import shiv from "../../assets/images/shivprasad.jpg";
import shashi from "../../assets/images/shashikant.jpg";

function Team() {
  return (
    <div id="team">
      <section className="">
        <div className="py-24 px-4 mx-auto max-w-screen-xl lg:py-170 lg:px-6 ">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-16">
            <h2 className="tracking-tight text-white font-bold text-center text-5xl mb-8">
              Our Team
            </h2>
            <p
              className="text-white text-center text-2xl mb-4"
              style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
            >
              We prioritize communication and transparency at every step of the
              development process to create websites that meet and exceed our
              clients' expectations and drive real results for their businesses.
            </p>
            <p
              className="text-white text-center text-2xl mb-4"
              style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
            >
              We are a team of passionate developers willing to understand
              Customer Problems and provide solutions using technology. We are
              guided by the expertise of{" "}
              <span className="font-bold">
                <a
                //  href="https://www.linkedin.com/in/Submit-shevtekar-19b54415/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Ms.S.V.Shinkar
                </a>
              </span>
            </p>
          </div>
          <div
            className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-3"
            style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
          >
            <div className="items-center bg-gray-50 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 w-80 h-50">
              <a
                href="https://www.linkedin.com/in/akshay-tuptewar-6937281ba/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                  src={akshay}
                  alt="Bonnie Avatar"
                />
              </a>
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a
                    href="https://www.linkedin.com/in/akshay-tuptewar-6937281ba/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Akshay Tuptewar
                  </a>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  Developer
                </span>
              </div>
            </div>
            <div className="items-center bg-gray-50 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-80 h-50">
              <a
                href="https://www.linkedin.com/in/shivprasad-chaudhari-1896b2206/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                  src={shiv}
                  alt="Jese Avatar"
                />
              </a>
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a
                    href="https://www.linkedin.com/in/shivprasad-chaudhari-1896b2206/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Shivprasad Chaudhari
                  </a>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  Developer
                </span>
              </div>
            </div>

            <div className="items-center bg-gray-50 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-80 h-50">
              <a
                href="https://www.linkedin.com/in/shashikant-deshmukh-9302901b9/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                  src={shashi}
                  alt="Sofia Avatar"
                />
              </a>
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a
                    href="https://www.linkedin.com/in/shashikant-deshmukh-9302901b9/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Shashikant Deshmukh
                  </a>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  Developer
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Team;
