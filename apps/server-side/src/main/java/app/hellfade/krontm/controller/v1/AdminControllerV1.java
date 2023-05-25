package app.hellfade.krontm.controller.v1;

import app.hellfade.krontm.controller.base.BaseController;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminControllerV1 extends BaseController {

	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	@Operation(hidden = true)
	// @PreAuthorize("@securityService.hasProtectedAccess()")
	public ResponseEntity<?> getHello() {
		return ResponseEntity.ok("Hello Admin");
	}
}
