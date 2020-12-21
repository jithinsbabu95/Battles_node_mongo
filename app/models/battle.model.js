module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        attacker_3:String,
        attacker_4:String,
        defender_1:String,
        defender_4:String,
        major_death:String,
        defender_commander:String,
        attacker_king:String,
        defender_king:String,
        attacker_2:String,
        defender_size:String,
        region:String,
        summer:String,
        name:String,
        year:String,
        battle_number:String,
        defender_2:String,
        defender_3:String,
        attacker_outcome:String,
        attacker_size:String,
        attacker_1:String,
        battle_type:String,
        major_capture:String,
        attacker_commander:String,
        location:String,
        note:String,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Battle = mongoose.model("battles", schema);
    return Battle;
  };