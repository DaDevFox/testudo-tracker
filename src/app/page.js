"use client";

import "@/styles/globals.css";
import WebsiteTitle from "@/components/WebsiteTitle";
import styles from "@/styles/home-page.module.css";
import Card from "@/components/Card";
import React from "react";
import check from "@/media/check-mark.png";
import list from "@/media/list.png";
import people from "@/media/peopletwo.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.homePageMain}>
      <WebsiteTitle />
      <div className={styles.tagLineContainer}>
        <p className={styles.tagLine}>Never miss a class again</p>
      </div>

      <div className={styles.cardContainer}>
        <Card
          imgHeight={85}
          imgWidth={85}
          img={check}
          title="All your classes, All the time"
          description="Never miss a class registration again! The moment a class opens up on Testudo, you'll get an email about it!"
        />
        <Card
          imgHeight={85}
          imgWidth={85}
          img={list}
          title="Track as many as you want"
          description="Track as many classes as you want from any department at UMD. There's no limit, and it's 100% free."
        />
        <Card
          imgHeight={80}
          imgWidth={110}
          img={people}
          title="Get your friends in your classes"
          description="Taking classes with your friends is always better, so tell your friends to sign up for Testudo Tracker!"
        />
      </div>

      <Link className={styles.buttonContainer} href="/register">
        Sign Up Now!
      </Link>
    </div>
  );
}
