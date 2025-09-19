module.exports = (Sequelize, DataTypes) => {

    const Member = Sequelize.define('Member', {

        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        MemberCardID:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        firstName:{
            type: DataTypes.STRING,
            allowNull: false
        },

        lastName:{
            type: DataTypes.STRING,
            allowNull: false
        },

        phoneNo:{
            type: DataTypes.STRING(10),
            allowNull: false
        },

        address:{
            type: DataTypes.STRING,
            allowNull: false
        },

        email:{
            type: DataTypes.STRING,
            allowNull: false
        },

        password:{
            type: DataTypes.STRING,
            allowNull: false
        },

        isActive:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
       }
    },{
        paranaoid: true,
        deletedAt: 'MemAccRemovalDate'
    })

    return Member;
}