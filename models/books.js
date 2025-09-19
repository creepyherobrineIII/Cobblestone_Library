module.exports = (Sequelize, DataTypes) => {

    const Books = Sequelize.define('Books', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        ISBN:{
            type: DataTypes.STRING(13),
            allowNull: false,
            unique: true,
            validate:{
                len:{
                    args: [13,13],
                    msg: "ISBN must be 13 characters"
                }
            }   
        },

        bookTitle:{
            type: DataTypes.STRING,
            allowNull: false
        },

        author:{
            type: DataTypes.STRING,
            allowNull: false
        },

        genre:{
            type: DataTypes.ENUM('Arts', 'Business & Finance', 'Children\'s Books', 'Fiction', 'Health & Wellness', 'Non-fiction', 'Science, Technology & Mathematics', 'Social Sciences', 'Textbooks'),
            allowNull:false
        },

        subgenre:{
            type: DataTypes.STRING(50),
            allowNull:false
        },

        pubDate:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        edition:{
            type: DataTypes.STRING(10),
            allowNull: false
        },

        publisher:{
            type: DataTypes.STRING,
            allowNull: false
        },

        bookDescription:{
            type: DataTypes.TEXT,
            allowNull: false
        },

        bookFormat:{
            type: DataTypes.STRING(15),
            allowNull: false
        },
        
        picture:{
            type: DataTypes.TEXT,
            allowNull: false
        }
    },{
        paranaoid: true,
        deletedAt: 'BookRemovalDate'
    });

    return Books
}