{
  "views": {
      "all": {
          "map": "function (doc) {if (doc.type === 'io.worldsibu.examples.participant') emit(doc._id, doc);}"
      }
  }
}
