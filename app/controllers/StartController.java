package controllers;

import play.mvc.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Date;
import java.text.SimpleDateFormat;

public class StartController extends Controller {

  public Result startReport() {
    Map<String, String> reportData = new HashMap<String, String>() {
      {
        put("name", "Alan Smith");
        put("dateOfBirth", "06/02/1976");
        put("age", "41");
        put("address", "1 Albert Square, Manchester, Greater Manchester. M60 2LA");
        put("crn", "B56789");
        put("pcn", "98793030");
        put("court", "Manchester and Salford Magistrates Court");
        put("dateOfHearing", new SimpleDateFormat("dd MMMM yyy").format(new Date()));
        put("localJusticeArea", "Greater Manchester");
      }
    };
    return ok(views.html.startReport.render(reportData));
  }
}
