const dammyData = {
    players: [
        {
            name: "ahmed aly",
            email: "ahmedaly@yahoo.com",
            password: "12345678",
            tel: "01090802020"
        },
        {
            name: "waleed ",
            email: "waleed@yahoo.com",
            password: "12345678",
            tel: "01090802021"
        }
        ,
        {
            name: "amr saad",
            email: "amrsaad@yahoo.com",
            password: "12345678",
            tel: "01090802022"
        },
        {
            name: "mohamed helmy",
            email: "mohamedhelmy@yahoo.com",
            password: "12345678",
            tel: "01090802023"
        },
        {
            name: "anas osama",
            email: "anasosama@yahoo.com",
            password: "12345678",
            tel: "01090802024"
        }
    ],
    owners: [
        {
            name: "احمد على",
            email: "ahmedaly@yahoo.com",
            password: "12345678",
            tel: "01090802020"
        },
        {
            name: "waleed سشغثي",
            email: "waleed@yahoo.com",
            password: "12345678",
            tel: "01090802021"
        }
        ,
        {
            name: "amr saad",
            email: "amrsaad@yahoo.com",
            password: "12345678",
            tel: "01090802022"
        },
        {
            name: "محمد حلمى",
            email: "mohamedhelmy@yahoo.com",
            password: "12345678",
            tel: "01090802023"
        },
        {
            name: "anas osama",
            email: "anasosama@yahoo.com",
            password: "12345678",
            tel: "01090802024"
        }
    ],
    stadiums: [
        {
            title: 'دار الابطال ',
            description: 'نجيله صناعي - ملعب خماسي',
            image: "https://www.machro3.org/wp-content/uploads/2021/12/fifa-certified-artificial-football-grass-500x500-1-1200x675.jpg",
            hourPrice: 200,
            address: "شارع الهرم مدرسة دار الحنان، فيصل",
            ownerID: 1
        },
        {
            title: 'امبريال جاردينيا ',
            description: 'نجيله صناعي - ملعب خماسي',
            image: "https://www.machro3.org/wp-content/uploads/2021/12/fifa-certified-artificial-football-grass-500x500-1-1200x675.jpg",
            hourPrice: 250,
            address: "كمبوند جاردينيا - بوابة ١",
            ownerID: 2
        },
        {
            title: 'ريتاج ١ ',
            description: 'نجيله صناعي - ملعب خماسي',
            image: "https://www.machro3.org/wp-content/uploads/2021/12/fifa-certified-artificial-football-grass-500x500-1-1200x675.jpg",
            hourPrice: 230,
            address: "ش الخمسين، الشطر ١٣، زهراء المعادي، بالقرب من كارفور",
            ownerID: 1
        }
        , {
            title: 'جوليانا ',
            description: 'نجيله صناعي - ملعب خماسي',
            image: "https://www.machro3.org/wp-content/uploads/2021/12/fifa-certified-artificial-football-grass-500x500-1-1200x675.jpg",
            hourPrice: 200,
            address: "مدينة نصر - رابعة - شارع ابن حوقل",
            ownerID: 1
        },
        {
            title: 'ملعب CIC ',
            description: 'نجيله صناعي - ملعب خماسي',
            image: "https://www.machro3.org/wp-content/uploads/2021/12/fifa-certified-artificial-football-grass-500x500-1-1200x675.jpg",
            hourPrice: 180,
            address: "الشيخ زايد، الجامعة الكندية",
            ownerID: 1
        }
    ],
    hours: [
        {
            day: new Date(2023, 4, 2),
            hour: "10pm",
            isAvailable: true,
            stadiumId: 1
        },
        {
            day: new Date(2023, 4, 2),
            hour: "9pm",
            isAvailable: true,
            stadiumId: 1
        },
        {
            day: new Date(2023, 4, 2),
            hour: "8pm",
            isAvailable: true,
            stadiumId: 2
        },
        {
            day: new Date(2023, 4, 2),
            hour: "7pm",
            isAvailable: true,
            stadiumId: 2
        },
        {
            day: new Date(2023, 4, 2),
            hour: "10pm",
            isAvailable: true,
            stadiumId: 3
        },
        {
            day: new Date(2023, 4, 2),
            hour: "9pm",
            isAvailable: true,
            stadiumId: 3
        },
        {
            day: new Date(2023, 4, 2),
            hour: "10pm",
            isAvailable: true,
            stadiumId: 4
        },
        {
            day: new Date(2023, 4, 2),
            hour: "11pm",
            isAvailable: true,
            stadiumId: 4
        },
        {
            day: new Date(2023, 4, 2),
            hour: "7pm",
            isAvailable: true,
            stadiumId: 5
        },
        {
            day: new Date(2023, 4, 2),
            hour: "8pm",
            isAvailable: true,
            stadiumId: 5
        },

    ],
}
module.exports = dammyData;