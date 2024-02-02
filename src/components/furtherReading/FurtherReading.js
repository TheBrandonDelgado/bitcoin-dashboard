import React from 'react';
import './FurtherReading.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

function FurtherReading() {
    const readingMaterial = [
        {
            title: "Bitcoin is Venice",
            author: "Allen Farrington & Sacha Meyers",
            link: "https://store.bitcoinmagazine.com/products/bitcoin-is-venice"
        },
        {
            title: "The Bitcoin Standard",
            author: "Saifedean Ammous",
            link: "https://saifedean.com/tbs"
        },
        {
            title: "The Network State",
            author: "Balaji Srinivasan",
            link: "https://thenetworkstate.com"
        },
        {
            title: "Broken Money",
            author: "Lyn Alden",
            link: "https://www.amazon.com/Broken-Money-Financial-System-Failing/dp/B0CG83QBJ6"
        },
        {
            title: "End the Fed",
            author: "Ron Raul",
            link: "https://www.amazon.com/End-Fed-Ron-Paul/dp/0446549193"
        }
    ];

    return (
        <div className="further-reading">
            <h2 className="reading-heading">Ignore the noise. Buy Bitcoin.</h2>
            <ul>
                {
                    readingMaterial.map(book => (
                        <li>
                            <a className="book-info" href={book.link}>
                                <p className="book" href={book.link}>{book.title}</p>
                                <p className="author">{book.author}</p>
                            </a>
                            <FontAwesomeIcon icon={faAngleRight} color={"white"}/>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default FurtherReading;