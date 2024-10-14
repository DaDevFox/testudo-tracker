import styles from "@/styles/components.module.css";
import React from 'react';
import { useState } from "react";
import Image from 'next/image'


export default function Card({ imgHeight, imgWidth, img, title, description }) {


    
    return (
        <div className={styles.card}>
            <p className={styles.cardTitle}>{title}</p>
            <p className={styles.cardDescription}>{description}</p>
            <Image src={img} width={imgWidth} height={imgHeight} alt="pic2" className={styles.cardImage} />
        </div>
    )
}