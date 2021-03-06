package controllers;

import com.google.common.collect.ImmutableMap;
import helpers.JsonHelper;
import javax.inject.Inject;
import java.io.IOException;
import lombok.val;
import org.languagetool.JLanguageTool;
import org.languagetool.language.BritishEnglish;
import play.mvc.*;
import views.html.nationalSearch;

public class NationalSearchController extends Controller {

    private final nationalSearch template;

    @Inject
    public NationalSearchController(nationalSearch template) {

        this.template = template;
    }

    public Result index() {

        return ok(template.render());
    }

    public Result postSpellcheck() {

        return spellcheck(request().body().asText());
    }

    public Result spellcheck(String text) {

        val spellChecker = new JLanguageTool(new BritishEnglish());

        try {
            return JsonHelper.okJson(
                    spellChecker.check(text).stream().map(mistake -> ImmutableMap.of(
                            "mistake", text.substring(mistake.getFromPos(), mistake.getToPos()),
                            "suggestions", mistake.getSuggestedReplacements()
                            )
                    )
            );
        } catch (IOException ex) {

            return badRequest(ex.getMessage());
        }
    }
}
